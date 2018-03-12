import { newApp, newProject, runCLI, updateFile, cleanup } from '../utils';

describe('DowngradeModule', () => {
  beforeAll(() => {
    cleanup();
  });

  afterAll(() => {
    cleanup();
  });

  it(
    'should generate a downgradeModule setup',
    () => {
      newProject();
      newApp('myapp');

      updateFile(
        'apps/myapp/src/legacy.js',
        `window.angular.module('legacy', []);`
      );

      runCLI('generate downgrade-module legacy --angularJsImport=./legacy');

      runCLI('build');
      expect(runCLI('test --single-run')).toContain('Executed 1 of 1 SUCCESS');
    },
    1000000
  );
});
