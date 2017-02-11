import nodeResolve from 'rollup-plugin-node-resolve';

function fromKebabToCamelCase(str) {
  return str.replace(/\-(.{1})/g, (_, w) => w.toUpperCase());
}

function transformer(regex, ...transformers) {
  if (transformers && transformers.length > 0) {
    regex.transform = val => transformers.reduce((v, fn) => fn(v), val);
  }
  return regex;
}

const globalConf = {
  'ng.$1': transformer(/^\@angular\/(.+)/, fromKebabToCamelCase),
  'ngBootstrap': '@ng-bootstrap\/ng-bootstrap',
  'tslib': 'tslib',
  'Rx': /^rxjs\/[^/]+$/,
  'Rx.Observable': /^rxjs\/add\/observable\/[^/]+$/,
  'Rx.Observable.prototype': /^rxjs\/add\/operator\/[^/]+$/,
};

export default {
  entry: 'dist/em/index.js',
  dest: 'dist/bundles/em.umd.js',
  format: 'umd',
  moduleName: 'emWebComponents',
  plugins: [
    nodeResolve({ jsnext: true, browser: true })
  ],
  globals: (moduleId) => {
    let global = '';

    const isGlobalResolved = Object.keys(globalConf)
      .some(pattern => {
        const globMatcher = globalConf[pattern];

        if (typeof globMatcher === 'string' && moduleId === globMatcher) {
          global = pattern;
          return true;
        } else if (globMatcher instanceof RegExp) {
          const matches = moduleId.match(globMatcher);

          if (matches) {
            global = matches.reduce((p, match, i) => {
              if (typeof globMatcher.transform === 'function') {
                match = globMatcher.transform(match, i);
              }
              return p.replace(`$${i}`, match);
            }, pattern);

            return true;
          }
        }

        return false;
      });

    if (!isGlobalResolved) {
      console.warn(`Global not resolved for module '${moduleId}'`);
    }

    return global;
  },
  external: (moduleId) => {
    if (/^(\@angular|\@ng\-bootstrap|rxjs)\//.test(moduleId)) {
      return true;
    }

    return false;
  }
};
