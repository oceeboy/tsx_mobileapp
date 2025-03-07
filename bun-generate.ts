import { mkdirSync, writeFileSync, existsSync, readdirSync } from 'fs';
import { join } from 'path';

const BASE_MODULES_PATH = join(process.cwd(), 'modules');

const createModule = (moduleName: string) => {
  const modulePath = join(BASE_MODULES_PATH, moduleName);
  const subfolders = ['components', 'hooks', 'services', 'constants'];

  // Ensure modules directory exists
  if (!existsSync(BASE_MODULES_PATH)) {
    mkdirSync(BASE_MODULES_PATH);
  }

  // If module exists, check for missing subfolders
  if (existsSync(modulePath)) {
    console.log(
      `⚠️ Module "${moduleName}" already exists. Checking for missing subfolders...`
    );

    let allPresent = true;
    subfolders.forEach((folder) => {
      const folderPath = join(modulePath, folder);
      if (!existsSync(folderPath)) {
        mkdirSync(folderPath);
        writeFileSync(join(folderPath, '.gitkeep'), '');
        writeFileSync(
          join(folderPath, 'README.md'),
          `# ${moduleName} - ${folder}\n\nThis folder is for ${moduleName} ${folder}. Write the rules you need devs to follow.`
        );
        writeFileSync(join(folderPath, 'index.ts'), ''); // Ensure index.ts exists
        console.log(`✅ Created missing folder: ${moduleName}/${folder}`);
        allPresent = false;
      }
    });

    if (allPresent) {
      console.log(
        `✅ Module "${moduleName}" is already complete. No missing subfolders.`
      );
    }

    // Ensure index.ts is updated
    updateModuleIndex(moduleName);
    return;
  }

  // Create module folder
  mkdirSync(modulePath);
  console.log(`📁 Created module: ${moduleName}`);

  // Create subfolders with .gitkeep, README.md, and index.ts
  subfolders.forEach((folder) => {
    const folderPath = join(modulePath, folder);
    mkdirSync(folderPath);
    writeFileSync(join(folderPath, '.gitkeep'), '');
    writeFileSync(
      join(folderPath, 'README.md'),
      `# ${moduleName} - ${folder}\n\nThis folder is for ${moduleName} ${folder}. Write the rules you need devs to follow.`
    );
    writeFileSync(join(folderPath, 'index.ts'), ''); // Ensure index.ts exists
    console.log(`📂 Created folder: ${moduleName}/${folder}`);
  });

  // Create module index.ts
  updateModuleIndex(moduleName);
};

const updateModuleIndex = (moduleName: string) => {
  const modulePath = join(BASE_MODULES_PATH, moduleName);
  const subfolders = ['components', 'hooks', 'services', 'constants'];
  const indexPath = join(modulePath, 'index.ts');

  const exportStatements = subfolders
    .filter((folder) => existsSync(join(modulePath, folder))) // Only include existing folders
    .map((folder) => `export * from "./${folder}";`)
    .join('\n');

  writeFileSync(indexPath, `${exportStatements}\n`);
  console.log(`✅ Updated ${moduleName}/index.ts`);

  // Update the central modules/index.ts
  updateModulesIndex();
};

const updateModulesIndex = () => {
  const modulesIndexPath = join(BASE_MODULES_PATH, 'index.ts');

  const existingModules = readdirSync(BASE_MODULES_PATH)
    .filter((dir) => dir !== 'index.ts')
    .sort(); // Sort alphabetically for cleaner output

  const exportStatements = existingModules
    .map((name) => `export * as ${capitalize(name)}Module from "./${name}";`)
    .join('\n');

  writeFileSync(modulesIndexPath, `${exportStatements}\n`);
  console.log(`🔄 Updated modules/index.ts`);
};

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

// CLI Handling
const args = process.argv.slice(2);
if (args.length !== 2 || args[0] !== 'modules') {
  console.log('❌ Usage: bun bun-generate.ts modules <module-name>');
  process.exit(1);
}

const moduleName = args[1];
createModule(moduleName);
