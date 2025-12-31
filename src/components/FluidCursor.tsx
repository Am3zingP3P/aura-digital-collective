import { useEffect, useRef, useCallback } from 'react';

interface FluidCursorProps {
  simResolution?: number;
  dyeResolution?: number;
  densityDissipation?: number;
  velocityDissipation?: number;
  pressure?: number;
  curl?: number;
  splatRadius?: number;
  splatForce?: number;
}

const FluidCursor = ({
  simResolution = 128,
  dyeResolution = 1024,
  densityDissipation = 1.5,
  velocityDissipation = 1,
  pressure = 0.8,
  curl = 30,
  splatRadius = 0.25,
  splatForce = 6000,
}: FluidCursorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getWebGLContext = useCallback((canvas: HTMLCanvasElement) => {
    const params = {
      alpha: true,
      depth: false,
      stencil: false,
      antialias: false,
      preserveDrawingBuffer: false,
    };

    let gl = canvas.getContext('webgl2', params) as WebGL2RenderingContext | null;
    const isWebGL2 = !!gl;
    if (!gl) {
      gl = (canvas.getContext('webgl', params) || canvas.getContext('experimental-webgl', params)) as WebGL2RenderingContext;
    }

    let halfFloat: { HALF_FLOAT_OES: number } | null = null;
    let supportLinearFiltering: OES_texture_float_linear | null = null;

    if (isWebGL2) {
      gl.getExtension('EXT_color_buffer_float');
      supportLinearFiltering = gl.getExtension('OES_texture_float_linear');
    } else {
      halfFloat = gl.getExtension('OES_texture_half_float');
      supportLinearFiltering = gl.getExtension('OES_texture_half_float_linear');
    }

    gl.clearColor(0.0, 0.0, 0.0, 0.0);

    const halfFloatTexType = isWebGL2
      ? (gl as WebGL2RenderingContext).HALF_FLOAT
      : halfFloat?.HALF_FLOAT_OES || 0;

    let formatRGBA: { internalFormat: number; format: number } | null = null;
    let formatRG: { internalFormat: number; format: number } | null = null;
    let formatR: { internalFormat: number; format: number } | null = null;

    if (isWebGL2) {
      formatRGBA = getSupportedFormat(gl, (gl as WebGL2RenderingContext).RGBA16F, gl.RGBA, halfFloatTexType);
      formatRG = getSupportedFormat(gl, (gl as WebGL2RenderingContext).RG16F, (gl as WebGL2RenderingContext).RG, halfFloatTexType);
      formatR = getSupportedFormat(gl, (gl as WebGL2RenderingContext).R16F, (gl as WebGL2RenderingContext).RED, halfFloatTexType);
    } else {
      formatRGBA = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
      formatRG = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
      formatR = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
    }

    function getSupportedFormat(gl: WebGLRenderingContext, internalFormat: number, format: number, type: number) {
      if (!supportRenderTextureFormat(gl, internalFormat, format, type)) {
        switch (internalFormat) {
          case (gl as WebGL2RenderingContext).R16F:
            return getSupportedFormat(gl, (gl as WebGL2RenderingContext).RG16F, (gl as WebGL2RenderingContext).RG, type);
          case (gl as WebGL2RenderingContext).RG16F:
            return getSupportedFormat(gl, (gl as WebGL2RenderingContext).RGBA16F, gl.RGBA, type);
          default:
            return null;
        }
      }
      return { internalFormat, format };
    }

    function supportRenderTextureFormat(gl: WebGLRenderingContext, internalFormat: number, format: number, type: number) {
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);

      const fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);

      const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
      return status === gl.FRAMEBUFFER_COMPLETE;
    }

    return {
      gl,
      ext: {
        formatRGBA,
        formatRG,
        formatR,
        halfFloatTexType,
        supportLinearFiltering,
      },
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { gl, ext } = getWebGLContext(canvas);
    if (!gl) return;

    function resizeCanvas() {
      if (!canvas) return;
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Shader sources
    const baseVertexShader = `
      precision highp float;
      attribute vec2 aPosition;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform vec2 texelSize;
      void main () {
        vUv = aPosition * 0.5 + 0.5;
        vL = vUv - vec2(texelSize.x, 0.0);
        vR = vUv + vec2(texelSize.x, 0.0);
        vT = vUv + vec2(0.0, texelSize.y);
        vB = vUv - vec2(0.0, texelSize.y);
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    const copyShader = `
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      uniform sampler2D uTexture;
      void main () {
        gl_FragColor = texture2D(uTexture, vUv);
      }
    `;

    const clearShader = `
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      uniform sampler2D uTexture;
      uniform float value;
      void main () {
        gl_FragColor = value * texture2D(uTexture, vUv);
      }
    `;

    const displayShader = `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      uniform sampler2D uTexture;
      void main () {
        vec3 c = texture2D(uTexture, vUv).rgb;
        float a = max(c.r, max(c.g, c.b));
        gl_FragColor = vec4(c, a);
      }
    `;

    const splatShader = `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      uniform sampler2D uTarget;
      uniform float aspectRatio;
      uniform vec3 color;
      uniform vec2 point;
      uniform float radius;
      void main () {
        vec2 p = vUv - point.xy;
        p.x *= aspectRatio;
        vec3 splat = exp(-dot(p, p) / radius) * color;
        vec3 base = texture2D(uTarget, vUv).xyz;
        gl_FragColor = vec4(base + splat, 1.0);
      }
    `;

    const advectionShader = `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      uniform sampler2D uVelocity;
      uniform sampler2D uSource;
      uniform vec2 texelSize;
      uniform vec2 dyeTexelSize;
      uniform float dt;
      uniform float dissipation;
      vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
        vec2 st = uv / tsize - 0.5;
        vec2 iuv = floor(st);
        vec2 fuv = fract(st);
        vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
        vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
        vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
        vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);
        return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
      }
      void main () {
        vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
        vec4 result = bilerp(uSource, coord, dyeTexelSize);
        float decay = 1.0 + dissipation * dt;
        gl_FragColor = result / decay;
      }
    `;

    const divergenceShader = `
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      varying highp vec2 vL;
      varying highp vec2 vR;
      varying highp vec2 vT;
      varying highp vec2 vB;
      uniform sampler2D uVelocity;
      void main () {
        float L = texture2D(uVelocity, vL).x;
        float R = texture2D(uVelocity, vR).x;
        float T = texture2D(uVelocity, vT).y;
        float B = texture2D(uVelocity, vB).y;
        vec2 C = texture2D(uVelocity, vUv).xy;
        if (vL.x < 0.0) { L = -C.x; }
        if (vR.x > 1.0) { R = -C.x; }
        if (vT.y > 1.0) { T = -C.y; }
        if (vB.y < 0.0) { B = -C.y; }
        float div = 0.5 * (R - L + T - B);
        gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
      }
    `;

    const curlShader = `
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      varying highp vec2 vL;
      varying highp vec2 vR;
      varying highp vec2 vT;
      varying highp vec2 vB;
      uniform sampler2D uVelocity;
      void main () {
        float L = texture2D(uVelocity, vL).y;
        float R = texture2D(uVelocity, vR).y;
        float T = texture2D(uVelocity, vT).x;
        float B = texture2D(uVelocity, vB).x;
        float vorticity = R - L - T + B;
        gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
      }
    `;

    const vorticityShader = `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uVelocity;
      uniform sampler2D uCurl;
      uniform float curl;
      uniform float dt;
      void main () {
        float L = texture2D(uCurl, vL).x;
        float R = texture2D(uCurl, vR).x;
        float T = texture2D(uCurl, vT).x;
        float B = texture2D(uCurl, vB).x;
        float C = texture2D(uCurl, vUv).x;
        vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
        force /= length(force) + 0.0001;
        force *= curl * C;
        force.y *= -1.0;
        vec2 velocity = texture2D(uVelocity, vUv).xy;
        velocity += force * dt;
        velocity = min(max(velocity, -1000.0), 1000.0);
        gl_FragColor = vec4(velocity, 0.0, 1.0);
      }
    `;

    const pressureShader = `
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      varying highp vec2 vL;
      varying highp vec2 vR;
      varying highp vec2 vT;
      varying highp vec2 vB;
      uniform sampler2D uPressure;
      uniform sampler2D uDivergence;
      void main () {
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        float C = texture2D(uPressure, vUv).x;
        float divergence = texture2D(uDivergence, vUv).x;
        float pressure = (L + R + B + T - divergence) * 0.25;
        gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
      }
    `;

    const gradientSubtractShader = `
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      varying highp vec2 vL;
      varying highp vec2 vR;
      varying highp vec2 vT;
      varying highp vec2 vB;
      uniform sampler2D uPressure;
      uniform sampler2D uVelocity;
      void main () {
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        vec2 velocity = texture2D(uVelocity, vUv).xy;
        velocity.xy -= vec2(R - L, T - B);
        gl_FragColor = vec4(velocity, 0.0, 1.0);
      }
    `;

    function compileShader(type: number, source: string) {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    }

    function createProgram(vertexSource: string, fragmentSource: string) {
      const program = gl.createProgram();
      if (!program) return null;

      const vertexShader = compileShader(gl.VERTEX_SHADER, vertexSource);
      const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentSource);

      if (!vertexShader || !fragmentShader) return null;

      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);

      return program;
    }

    function getUniforms(program: WebGLProgram) {
      const uniforms: Record<string, WebGLUniformLocation | null> = {};
      const uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
      for (let i = 0; i < uniformCount; i++) {
        const uniformName = gl.getActiveUniform(program, i)?.name;
        if (uniformName) {
          uniforms[uniformName] = gl.getUniformLocation(program, uniformName);
        }
      }
      return uniforms;
    }

    // Initialize programs
    const copyProgram = createProgram(baseVertexShader, copyShader);
    const clearProgram = createProgram(baseVertexShader, clearShader);
    const displayProgram = createProgram(baseVertexShader, displayShader);
    const splatProgram = createProgram(baseVertexShader, splatShader);
    const advectionProgram = createProgram(baseVertexShader, advectionShader);
    const divergenceProgram = createProgram(baseVertexShader, divergenceShader);
    const curlProgram = createProgram(baseVertexShader, curlShader);
    const vorticityProgram = createProgram(baseVertexShader, vorticityShader);
    const pressureProgram = createProgram(baseVertexShader, pressureShader);
    const gradientSubtractProgram = createProgram(baseVertexShader, gradientSubtractShader);

    if (!copyProgram || !clearProgram || !displayProgram || !splatProgram || 
        !advectionProgram || !divergenceProgram || !curlProgram || !vorticityProgram || 
        !pressureProgram || !gradientSubtractProgram) {
      return;
    }

    const programs = {
      copy: { program: copyProgram, uniforms: getUniforms(copyProgram) },
      clear: { program: clearProgram, uniforms: getUniforms(clearProgram) },
      display: { program: displayProgram, uniforms: getUniforms(displayProgram) },
      splat: { program: splatProgram, uniforms: getUniforms(splatProgram) },
      advection: { program: advectionProgram, uniforms: getUniforms(advectionProgram) },
      divergence: { program: divergenceProgram, uniforms: getUniforms(divergenceProgram) },
      curl: { program: curlProgram, uniforms: getUniforms(curlProgram) },
      vorticity: { program: vorticityProgram, uniforms: getUniforms(vorticityProgram) },
      pressure: { program: pressureProgram, uniforms: getUniforms(pressureProgram) },
      gradientSubtract: { program: gradientSubtractProgram, uniforms: getUniforms(gradientSubtractProgram) },
    };

    // Create quad buffer
    const blit = (() => {
      const quadVertexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, quadVertexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
      
      const quadElementBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, quadElementBuffer);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);

      return (target: WebGLFramebuffer | null, clear = false) => {
        if (target === null) {
          gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
          gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        } else {
          gl.bindFramebuffer(gl.FRAMEBUFFER, target);
        }
        if (clear) {
          gl.clearColor(0.0, 0.0, 0.0, 0.0);
          gl.clear(gl.COLOR_BUFFER_BIT);
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, quadVertexBuffer);
        gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(0);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, quadElementBuffer);
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
      };
    })();

    // Create framebuffers
    function createFBO(w: number, h: number, internalFormat: number, format: number, type: number, filtering: number) {
      gl.activeTexture(gl.TEXTURE0);
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filtering);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filtering);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);

      const fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
      gl.viewport(0, 0, w, h);
      gl.clear(gl.COLOR_BUFFER_BIT);

      const texelSizeX = 1.0 / w;
      const texelSizeY = 1.0 / h;

      return {
        texture,
        fbo,
        width: w,
        height: h,
        texelSizeX,
        texelSizeY,
        attach(id: number) {
          gl.activeTexture(gl.TEXTURE0 + id);
          gl.bindTexture(gl.TEXTURE_2D, texture);
          return id;
        },
      };
    }

    function createDoubleFBO(w: number, h: number, internalFormat: number, format: number, type: number, filtering: number) {
      let fbo1 = createFBO(w, h, internalFormat, format, type, filtering);
      let fbo2 = createFBO(w, h, internalFormat, format, type, filtering);

      return {
        width: w,
        height: h,
        texelSizeX: fbo1.texelSizeX,
        texelSizeY: fbo1.texelSizeY,
        get read() {
          return fbo1;
        },
        set read(value) {
          fbo1 = value;
        },
        get write() {
          return fbo2;
        },
        set write(value) {
          fbo2 = value;
        },
        swap() {
          const temp = fbo1;
          fbo1 = fbo2;
          fbo2 = temp;
        },
      };
    }

    function getResolution(resolution: number) {
      let aspectRatio = gl.drawingBufferWidth / gl.drawingBufferHeight;
      if (aspectRatio < 1) aspectRatio = 1.0 / aspectRatio;

      const min = Math.round(resolution);
      const max = Math.round(resolution * aspectRatio);

      if (gl.drawingBufferWidth > gl.drawingBufferHeight) return { width: max, height: min };
      return { width: min, height: max };
    }

    const simRes = getResolution(simResolution);
    const dyeRes = getResolution(dyeResolution);

    const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;

    let dye = createDoubleFBO(
      dyeRes.width,
      dyeRes.height,
      ext.formatRGBA?.internalFormat || gl.RGBA,
      ext.formatRGBA?.format || gl.RGBA,
      ext.halfFloatTexType,
      filtering
    );

    let velocity = createDoubleFBO(
      simRes.width,
      simRes.height,
      ext.formatRG?.internalFormat || gl.RGBA,
      ext.formatRG?.format || gl.RGBA,
      ext.halfFloatTexType,
      filtering
    );

    let divergence = createFBO(
      simRes.width,
      simRes.height,
      ext.formatR?.internalFormat || gl.RGBA,
      ext.formatR?.format || gl.RGBA,
      ext.halfFloatTexType,
      gl.NEAREST
    );

    let curlFbo = createFBO(
      simRes.width,
      simRes.height,
      ext.formatR?.internalFormat || gl.RGBA,
      ext.formatR?.format || gl.RGBA,
      ext.halfFloatTexType,
      gl.NEAREST
    );

    let pressureFbo = createDoubleFBO(
      simRes.width,
      simRes.height,
      ext.formatR?.internalFormat || gl.RGBA,
      ext.formatR?.format || gl.RGBA,
      ext.halfFloatTexType,
      gl.NEAREST
    );

    // Pointer state
    const pointer = {
      x: 0,
      y: 0,
      deltaX: 0,
      deltaY: 0,
      moved: false,
      color: { r: 0.5, g: 1.0, b: 0.3 }, // Lime green to match theme
    };

    function updatePointerMoveData(x: number, y: number) {
      pointer.deltaX = (x - pointer.x) * 5.0;
      pointer.deltaY = (y - pointer.y) * 5.0;
      pointer.x = x;
      pointer.y = y;
      pointer.moved = Math.abs(pointer.deltaX) > 0 || Math.abs(pointer.deltaY) > 0;
    }

    function handleMouseMove(e: MouseEvent) {
      const posX = e.clientX / canvas.clientWidth;
      const posY = 1.0 - e.clientY / canvas.clientHeight;
      updatePointerMoveData(posX, posY);
    }

    function handleTouchMove(e: TouchEvent) {
      e.preventDefault();
      const touch = e.touches[0];
      const posX = touch.clientX / canvas.clientWidth;
      const posY = 1.0 - touch.clientY / canvas.clientHeight;
      updatePointerMoveData(posX, posY);
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    function splat(x: number, y: number, dx: number, dy: number, color: { r: number; g: number; b: number }) {
      gl.useProgram(programs.splat.program);
      gl.uniform1i(programs.splat.uniforms.uTarget, velocity.read.attach(0));
      gl.uniform1f(programs.splat.uniforms.aspectRatio, canvas.width / canvas.height);
      gl.uniform2f(programs.splat.uniforms.point, x, y);
      gl.uniform3f(programs.splat.uniforms.color, dx, dy, 0.0);
      gl.uniform1f(programs.splat.uniforms.radius, splatRadius / 100.0);
      blit(velocity.write.fbo);
      velocity.swap();

      gl.uniform1i(programs.splat.uniforms.uTarget, dye.read.attach(0));
      gl.uniform3f(programs.splat.uniforms.color, color.r, color.g, color.b);
      blit(dye.write.fbo);
      dye.swap();
    }

    function step(dt: number) {
      gl.disable(gl.BLEND);

      // Curl
      gl.useProgram(programs.curl.program);
      gl.uniform2f(programs.curl.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(programs.curl.uniforms.uVelocity, velocity.read.attach(0));
      blit(curlFbo.fbo);

      // Vorticity
      gl.useProgram(programs.vorticity.program);
      gl.uniform2f(programs.vorticity.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(programs.vorticity.uniforms.uVelocity, velocity.read.attach(0));
      gl.uniform1i(programs.vorticity.uniforms.uCurl, curlFbo.attach(1));
      gl.uniform1f(programs.vorticity.uniforms.curl, curl);
      gl.uniform1f(programs.vorticity.uniforms.dt, dt);
      blit(velocity.write.fbo);
      velocity.swap();

      // Divergence
      gl.useProgram(programs.divergence.program);
      gl.uniform2f(programs.divergence.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(programs.divergence.uniforms.uVelocity, velocity.read.attach(0));
      blit(divergence.fbo);

      // Clear pressure
      gl.useProgram(programs.clear.program);
      gl.uniform1i(programs.clear.uniforms.uTexture, pressureFbo.read.attach(0));
      gl.uniform1f(programs.clear.uniforms.value, pressure);
      blit(pressureFbo.write.fbo);
      pressureFbo.swap();

      // Pressure iterations
      gl.useProgram(programs.pressure.program);
      gl.uniform2f(programs.pressure.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(programs.pressure.uniforms.uDivergence, divergence.attach(0));
      for (let i = 0; i < 20; i++) {
        gl.uniform1i(programs.pressure.uniforms.uPressure, pressureFbo.read.attach(1));
        blit(pressureFbo.write.fbo);
        pressureFbo.swap();
      }

      // Gradient subtract
      gl.useProgram(programs.gradientSubtract.program);
      gl.uniform2f(programs.gradientSubtract.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(programs.gradientSubtract.uniforms.uPressure, pressureFbo.read.attach(0));
      gl.uniform1i(programs.gradientSubtract.uniforms.uVelocity, velocity.read.attach(1));
      blit(velocity.write.fbo);
      velocity.swap();

      // Advection velocity
      gl.useProgram(programs.advection.program);
      gl.uniform2f(programs.advection.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform2f(programs.advection.uniforms.dyeTexelSize, velocity.texelSizeX, velocity.texelSizeY);
      const velocityId = velocity.read.attach(0);
      gl.uniform1i(programs.advection.uniforms.uVelocity, velocityId);
      gl.uniform1i(programs.advection.uniforms.uSource, velocityId);
      gl.uniform1f(programs.advection.uniforms.dt, dt);
      gl.uniform1f(programs.advection.uniforms.dissipation, velocityDissipation);
      blit(velocity.write.fbo);
      velocity.swap();

      // Advection dye
      gl.uniform2f(programs.advection.uniforms.dyeTexelSize, dye.texelSizeX, dye.texelSizeY);
      gl.uniform1i(programs.advection.uniforms.uVelocity, velocity.read.attach(0));
      gl.uniform1i(programs.advection.uniforms.uSource, dye.read.attach(1));
      gl.uniform1f(programs.advection.uniforms.dissipation, densityDissipation);
      blit(dye.write.fbo);
      dye.swap();
    }

    function render() {
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.useProgram(programs.display.program);
      gl.uniform1i(programs.display.uniforms.uTexture, dye.read.attach(0));
      blit(null);
    }

    let lastTime = Date.now();
    let animationId: number;

    function update() {
      const now = Date.now();
      const dt = Math.min((now - lastTime) / 1000, 0.016666);
      lastTime = now;

      if (pointer.moved) {
        pointer.moved = false;
        splat(pointer.x, pointer.y, pointer.deltaX * splatForce, pointer.deltaY * splatForce, pointer.color);
      }

      step(dt);
      render();
      animationId = requestAnimationFrame(update);
    }

    update();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [getWebGLContext, simResolution, dyeResolution, densityDissipation, velocityDissipation, pressure, curl, splatRadius, splatForce]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-50"
      style={{ touchAction: 'none' }}
    />
  );
};

export default FluidCursor;
