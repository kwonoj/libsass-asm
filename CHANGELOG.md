<a name="0.0.3"></a>
## [0.0.3](https://github.com/kwonoj/libsass-asm/compare/0.0.2...0.0.3) (2018-07-25)


### Bug Fixes

* **allocstring:** use emscripten method, explicitly free ([e106327](https://github.com/kwonoj/libsass-asm/commit/e106327))
* **sassoptions:** correct imported functions ([5781c10](https://github.com/kwonoj/libsass-asm/commit/5781c10))


### Features

* **buildimporter:** importer namespace factory ([f17707d](https://github.com/kwonoj/libsass-asm/commit/f17707d))
* **getfnptrhandler:** wrapper to add, removefunction ([356bf24](https://github.com/kwonoj/libsass-asm/commit/356bf24))
* **sassimportentry:** implement sassimportentry ([c099763](https://github.com/kwonoj/libsass-asm/commit/c099763))
* **sassimportentry:** integrate makeimport ([3e8fb58](https://github.com/kwonoj/libsass-asm/commit/3e8fb58))
* **sassimportentrylist:** implement entrylist ([84d897e](https://github.com/kwonoj/libsass-asm/commit/84d897e))
* **sassloader:** export importer namespace ([aac6589](https://github.com/kwonoj/libsass-asm/commit/aac6589))
* **sassloader:** export updated interface ([88ec0c6](https://github.com/kwonoj/libsass-asm/commit/88ec0c6))
* **sassoptions:** expose importers ([4fd16e9](https://github.com/kwonoj/libsass-asm/commit/4fd16e9))
* **wrapsassimporter:** cwrap exported functions ([dad25bb](https://github.com/kwonoj/libsass-asm/commit/dad25bb))



<a name="0.0.2"></a>
## [0.0.2](https://github.com/kwonoj/libsass-asm/compare/0.0.1...0.0.2) (2018-07-15)


### Bug Fixes

* **cli:** allow specify test runner ([b0cfa00](https://github.com/kwonoj/libsass-asm/commit/b0cfa00))
* **cli:** exit gracefully ([eb0ad7a](https://github.com/kwonoj/libsass-asm/commit/eb0ad7a))
* **cli:** remove commented test code ([13a87ed](https://github.com/kwonoj/libsass-asm/commit/13a87ed))
* **cli:** revise mount logics ([2dab40b](https://github.com/kwonoj/libsass-asm/commit/2dab40b))
* **cwrapsignature:** supply typed returntype ([df4916b](https://github.com/kwonoj/libsass-asm/commit/df4916b))


### Features

* **addpath:** implement sassoptions add* path ([f944764](https://github.com/kwonoj/libsass-asm/commit/f944764))
* **buildcontext:** create wrap interface for context ([d8c4025](https://github.com/kwonoj/libsass-asm/commit/d8c4025))
* **buildoptioninterface:** initial implementation ([e084fe5](https://github.com/kwonoj/libsass-asm/commit/e084fe5))
* **buildsassoption:** implement few option values ([9be56a5](https://github.com/kwonoj/libsass-asm/commit/9be56a5))
* **cli:** accept input / output default param ([36b2fbf](https://github.com/kwonoj/libsass-asm/commit/36b2fbf))
* **cli:** build sass options ([318de80](https://github.com/kwonoj/libsass-asm/commit/318de80))
* **cli:** compileFile interface ([6c6f6f1](https://github.com/kwonoj/libsass-asm/commit/6c6f6f1))
* **cli:** default option creation ([398edb7](https://github.com/kwonoj/libsass-asm/commit/398edb7))
* **cli:** experimental compile cache ([df0f79e](https://github.com/kwonoj/libsass-asm/commit/df0f79e))
* **cli:** implement compilestdin ([5c2d3b4](https://github.com/kwonoj/libsass-asm/commit/5c2d3b4))
* **cli:** initial stdin reading ([804346c](https://github.com/kwonoj/libsass-asm/commit/804346c))
* **cli:** sourcemap option ([f9ef816](https://github.com/kwonoj/libsass-asm/commit/f9ef816))
* **cli:** writecompileresult ([1849125](https://github.com/kwonoj/libsass-asm/commit/1849125))
* **compilefile:** interface to compile file ([587215d](https://github.com/kwonoj/libsass-asm/commit/587215d))
* **cwrap:** export interfaces ([c7bffe6](https://github.com/kwonoj/libsass-asm/commit/c7bffe6))
* **cwrap:** expose more interfaces ([fbe1f8f](https://github.com/kwonoj/libsass-asm/commit/fbe1f8f))
* **debug:** enabling debug log environment variable ([4d8a45e](https://github.com/kwonoj/libsass-asm/commit/4d8a45e))
* **index:** export interfaces ([0b4cda6](https://github.com/kwonoj/libsass-asm/commit/0b4cda6))
* **interoputility:** export interop methods ([ded9036](https://github.com/kwonoj/libsass-asm/commit/ded9036))
* **sasscontext:** implement sasscontext ([5c520d3](https://github.com/kwonoj/libsass-asm/commit/5c520d3))
* **sassdatacontext:** implement sassdatacontext ([4999714](https://github.com/kwonoj/libsass-asm/commit/4999714))
* **sassfilecontext:** implement compile ([a800261](https://github.com/kwonoj/libsass-asm/commit/a800261))
* **sassfilecontext:** implement initial interface ([e668994](https://github.com/kwonoj/libsass-asm/commit/e668994))
* **sassloader:** export context api object ([b5cdbe6](https://github.com/kwonoj/libsass-asm/commit/b5cdbe6))
* **sassoptions:** create class for options interface ([282dc85](https://github.com/kwonoj/libsass-asm/commit/282dc85))
* **sassoptions:** export sourcemap property ([8d3badc](https://github.com/kwonoj/libsass-asm/commit/8d3badc))
* **sassoptions:** export style property ([4ff68f5](https://github.com/kwonoj/libsass-asm/commit/4ff68f5))
* **sassoptions:** expose interfaces without impl ([e8b98c1](https://github.com/kwonoj/libsass-asm/commit/e8b98c1))
* **sassoptions:** expose properties ([90eba25](https://github.com/kwonoj/libsass-asm/commit/90eba25))
* **sassoptions:** implements accessors ([e2377f8](https://github.com/kwonoj/libsass-asm/commit/e2377f8))
* **sassoptions:** initial directory mount ([0a3c62a](https://github.com/kwonoj/libsass-asm/commit/0a3c62a))
* **wrapoptionsinterface:** initial implementation ([649b1d4](https://github.com/kwonoj/libsass-asm/commit/649b1d4))
* **wrapsassoptions:** expose cwrapped functions ([237c1af](https://github.com/kwonoj/libsass-asm/commit/237c1af))
* **wrapsassoptions:** expose more interfaces ([33ff1ba](https://github.com/kwonoj/libsass-asm/commit/33ff1ba))
* **wrapsassoptions:** expose style fns ([0c0145b](https://github.com/kwonoj/libsass-asm/commit/0c0145b))



<a name="0.0.1"></a>
## 0.0.1 (2018-07-10)


### Features

* **bootstrap:** initial binary bootstrap ([bd44b0e](https://github.com/kwonoj/libsass-asm/commit/bd44b0e))
* **cli:** implement help, display version ([5d07778](https://github.com/kwonoj/libsass-asm/commit/5d07778))
* **cli:** initial cli entrypoint ([8bbe521](https://github.com/kwonoj/libsass-asm/commit/8bbe521))
* **getversion:** export getversion interface ([5310653](https://github.com/kwonoj/libsass-asm/commit/5310653))
* **loadmodule:** implement loadmodule ([d614551](https://github.com/kwonoj/libsass-asm/commit/d614551))
* **logger:** implement logger utility ([30a276a](https://github.com/kwonoj/libsass-asm/commit/30a276a))
* **sassasmmodule:** define initial interface ([8f1d595](https://github.com/kwonoj/libsass-asm/commit/8f1d595))
* **sassfactory:** define initial interface ([6d35c23](https://github.com/kwonoj/libsass-asm/commit/6d35c23))
* **sassloader:** expose getversion interface ([7ae4abb](https://github.com/kwonoj/libsass-asm/commit/7ae4abb))



