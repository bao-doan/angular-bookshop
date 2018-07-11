import { AppCustomModule } from './app-custom.module';

describe('AppCustomModule', () => {
  let appCustomModule: AppCustomModule;

  beforeEach(() => {
    appCustomModule = new AppCustomModule();
  });

  it('should create an instance', () => {
    expect(appCustomModule).toBeTruthy();
  });
});
