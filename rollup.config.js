import nodeResolve from 'rollup-plugin-node-resolve';

export default {
  entry: 'dist/em/index.js',
  dest: 'dist/bundles/em.umd.js',
  format: 'umd',
  moduleName: 'emWebComponents',
  plugins: [
    nodeResolve({ jsnext: true, browser: true })
  ],
  globals: {
    '@angular/core': 'ng.core',
    '@angular/common': 'ng.common',
    '@angular/http': 'ng.http',
    '@angular/platform-browser': 'ng.platformBrowser',
    '@ng-bootstrap/ng-bootstrap': 'ngBootstrap',
    'rxjs/Observable': 'Rx',
    'rxjs/add/observable/of': 'Rx.Observable',
    'rxjs/add/observable/empty': 'Rx.Observable',
    'rxjs/add/operator/switchMap': 'Rx.Observable.prototype',
    'rxjs/add/operator/mergeMap': 'Rx.Observable.prototype',
    'rxjs/add/operator/publishLast': 'Rx.Observable.prototype',
    'rxjs/add/operator/catch': 'Rx.Observable.prototype',
    'tslib': 'tslib'
  },
  external: (moduleId) => {
    if (/^(\@angular|\@ng\-bootstrap|rxjs)\//.test(moduleId)) {
      return true;
    }

    return false;
  }
};
