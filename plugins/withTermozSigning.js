const { withAppBuildGradle } = require("@expo/config-plugins");

function configureSigning(source) {
  const signingMarker = "signingConfigs {";

  if (source.split(signingMarker).length !== 2) {
    throw new Error("Termoz: signingConfigs block not found or duplicated");
  }

  const releasePattern =
    /(buildTypes\s*\{[\s\S]*?\brelease\s*\{[\s\S]*?\bsigningConfig\s+)signingConfigs\.debug\b/;

  if (!releasePattern.test(source)) {
    throw new Error("Termoz: expected release signing configuration not found");
  }

  const releaseConfig = `
        termozRelease {
            def keystorePath = System.getenv("TERMOZ_KEYSTORE_PATH")
            def signingPassword = System.getenv("TERMOZ_KEYSTORE_PASSWORD")

            if (keystorePath && signingPassword) {
                storeFile file(keystorePath)
                storePassword signingPassword
                keyAlias "termoz-release"
                keyPassword signingPassword
            }
        }
`;

  return source
    .replace(signingMarker, signingMarker + releaseConfig)
    .replace(releasePattern, "$1signingConfigs.termozRelease");
}

module.exports = (config) => {
  if (process.env.TERMOZ_RELEASE_SIGNING !== "1") return config;
  return withAppBuildGradle(config, (c) => {
    if (c.modResults.language !== "groovy") {
      throw new Error("Termoz: unsupported Gradle format");
    }

    c.modResults.contents = configureSigning(c.modResults.contents);
    return c;
  });
};
