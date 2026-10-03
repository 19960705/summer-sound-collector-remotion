import {Config} from '@remotion/cli/config';

// Optional local browser reuse; no machine-specific paths in source control.
if (process.env.REMOTION_BROWSER_EXECUTABLE) {
  Config.setBrowserExecutable(process.env.REMOTION_BROWSER_EXECUTABLE);
}
