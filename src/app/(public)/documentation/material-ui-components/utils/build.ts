import fs from 'fs';
import fsp from 'fs/promises';
import { spawn } from 'child_process';
import _ from 'lodash';
import { marked } from 'marked';
import Promise from 'promise';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const demoDir = '@/app/(public)/documentation/material-ui-components/components';
const rootDirectory = '@/app/(public)/documentation/material-ui-components';
const examplesDirectory = path.resolve(rootDirectory, './components');
const pagesDirectory = path.resolve(rootDirectory, './doc');
const routesFilePath = path.resolve(rootDirectory, './MaterialUIComponentsRoute.tsx');
const navigationFilePath = path.resolve(rootDirectory, './MaterialUIComponentsNavigation.ts');

const demoRegexp = /^"demo": "(.*)"/;
const componentRegexp = /^"component": "(.*)"/;
const headerRegExp = /---[\r\n]([\s\S]*)[\r\n]---/;
const emptyRegExp = /^\s*$/;

marked.Lexer.prototype.lex = function lex(src) {
	src = src
		.replace(/\r\n|\r/g, '\n')
		.replace(/\t/g, '    ')
		.replace(/\u2424/g, '\n');

	// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
	this.blockTokens(src, this.tokens);

	let next: { src: string; tokens: { type: string; raw: string }[] };

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	// eslint-disable-next-line no-cond-assign,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
	while ((next = this.inlineQueue.shift() as { src: string; tokens: { type: 'space'; raw: string }[] })) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
		this.inlineTokens(next.src, next.tokens);
	}

	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
	return this.tokens;
};

const renderer = new marked.Renderer();

marked.setOptions({
	gfm: true,
	breaks: false,
	pedantic: false,
	sanitize: false,
	smartypants: false,
	renderer
});

renderer.heading = (text, level) => {
	let className = '';
	switch (level) {
		case 1:
			className = 'text-5xl my-16 font-700';
			break;
		case 2:
			className = 'text-3xl mt-24 mb-10 font-700';
			break;
		case 3:
			className = 'text-15 mt-20 mb-10 font-700';
			break;
		default:
			className = 'text-base mt-12 mb-10';
	}

	return `<Typography className="${className}" component="h${level}">${text}</Typography>\n`;
};

renderer.paragraph = (text) => {
	return `<Typography className="text-base mb-32" component="div">${text}</Typography>\n`;
};

renderer.code = (code, lang) => {
	const response = `
<FuseHighlight component="pre" className="language-${lang}">
{%% 
${code}
%%}
</FuseHighlight>
`;
	return response.replace(/`/g, '\\`').replace(/%%/g, '`');
};

renderer.codespan = (code: string) => {
	const response = `<code>{@@${_.unescape(code)}@@}</code>`;
	return response.replace(/@@/g, '`');
};

const removeFile = async (filePath: string) => {
	try {
		const ifExists = await checkExistence(filePath);

		if (!ifExists) {
			return true;
		}

		await fsp.unlink(filePath);

		log('Successfully deleted the file.');
	} catch (error) {
		if (error) {
			log('File does not exist.', filePath);
		}
	}
	return true;
};

const renameFilePath = async (filePath: string, newPath: string) => {
	try {
		if (fsp.access(filePath)) {
			await fsp.rename(filePath, newPath);
			log('Successfully renamed the file.', newPath);
		}
	} catch (error) {
		if (error) {
			log('Cannot be renamed.', filePath);
		}
	}
};

async function checkExistence(dirPath: string) {
	try {
		await fsp.access(dirPath);
		// If the promise resolves, the file or directory exists
		return true;
	} catch (error) {
		// If the promise is rejected, the file or directory does not exist
		return false;
	}
}

const rmDir = async (dirPath: string) => {
	try {
		const isExist = await checkExistence(dirPath);

		if (!isExist) {
			return true;
		}

		const stats = await fsp.stat(dirPath);

		if (!stats.isDirectory()) {
			return true;
		}

		// Read directory contents
		const files = await fsp.readdir(dirPath);

		// Delete each item in the directory
		const deletePromises = files.map(async (file) => {
			const filePath = path.join(dirPath, file);
			const fileStat = await fsp.stat(filePath);

			if (fileStat.isDirectory()) {
				return rmDir(filePath); // Recursive call
			}

			return fsp.unlink(filePath);
		});

		await Promise.all(deletePromises);

		await fsp.rmdir(dirPath);
		// Remove the directory itself
		// await rmDir(dirPath);
	} catch (error) {
		if (error) {
			log(error);
		}
	}
	return true;
};

function allReplace(str: string, obj: Record<string, string>): string {
	let retStr = str;
	Object.keys(obj).forEach((key) => {
		retStr = retStr.replace(new RegExp(key, 'g'), obj[key]);
	});
	return retStr;
}

function getContents(markdown: string) {
	return markdown
		.replace(headerRegExp, '') // Remove header information
		.split(/^{{|}}$/gm) // Split markdown into an array, separating demos
		.filter((content) => !emptyRegExp.test(content)); // Remove empty lines
}

function getHtmlCode(markdownSource: string, fileDir: string) {
	const folderName = path.basename(fileDir); // example: simple-zoom

	markdownSource = eraseMdSection(markdownSource, folderName, 'breadcrumbs', 'Integration with react-router');
	markdownSource = eraseMdSection(markdownSource, folderName, 'pagination', 'Router integration');

	markdownSource = markdownSource.replace(
		/:::info([\s\S]*?):::/g,
		'<div className="border-1 p-16 rounded-xl my-12">\n$1\n</div>'
	);

	let contentsArr = getContents(markdownSource);
	const importPathList = [];
	contentsArr = contentsArr.map((content) => {
		const match = content.match(demoRegexp);
		const isMuiYou = content.match(/MaterialYouPlayground/);

		if (match && !isMuiYou) {
			const demoOptions = JSON.parse(`{${content}}`) as { demo: string; iframe?: boolean };
			const name = demoOptions.demo; // example: SimpleZoom.js
			const nameWithoutExt = path.basename(name, path.extname(name)); // example: SimpleZoom
			// const filePath = path.resolve(fileDir, name);

			const tsxFilePath = path.resolve(fileDir, `${nameWithoutExt}.tsx`);
			const tsFilePath = path.resolve(fileDir, `${nameWithoutExt}.ts`);
			const jsFilePath = path.resolve(fileDir, `${nameWithoutExt}.js`);
			const jsxFilePath = path.resolve(fileDir, `${nameWithoutExt}.jsx`);

			let fileType = '';

			// if has tsx file remove others if exists
			if (fs.existsSync(tsxFilePath)) {
				removeFile(tsFilePath);
				removeFile(jsFilePath);
				removeFile(jsxFilePath);
				fileType = 'tsx';
			} else if (fs.existsSync(tsFilePath)) {
				removeFile(jsFilePath);
				removeFile(jsxFilePath);
				renameFilePath(tsFilePath, tsxFilePath);
				fileType = 'ts';
			} else if (fs.existsSync(jsFilePath) && fs.existsSync(jsxFilePath)) {
				removeFile(jsFilePath);
				fileType = 'jsx';
			} else if (fs.existsSync(jsFilePath)) {
				renameFilePath(jsFilePath, jsxFilePath);
				fileType = 'jsx';
			} else {
				return '';
			}

			if (fileType !== '') {
				// const selectedFileName = path.basename(filePath);
				// const importPath = `../components/${folderName}/${selectedFileName}`;
				const componentPath = `../../components/${folderName}/${nameWithoutExt}`;

				const iframe = !!demoOptions.iframe;

				const componentNameVar = `${nameWithoutExt}Component`;
				const componentRawVar = `${nameWithoutExt}Raw`;

				importPathList.push(`import ${componentNameVar} from '${componentPath}';`);
				importPathList.push(`import ${componentRawVar} from '${componentPath}.${fileType}?raw';`);

				return `\n<FuseExample
                    name="${name}"
                    className="my-16"
                    iframe={${iframe}}
                    component={${componentNameVar}} 
                    raw={${componentRawVar}}
                    />`;
			}

			return '';
		}

		const muiComponent = content.match(componentRegexp);

		if (muiComponent) {
			return '';
		}

		return content;
	});

	const htmlCode = marked(contentsArr.join(''))
		.replace(/"{/g, '{')
		.replace(/}"/g, '}')
		.replace(/(<\s*\/?\s*)p(\s*([^>]*)?\s*>)/g, '$1Typography$2')
		.replace(/class=/g, 'className=')
		// .replace(/<img([^>]+)(\s*[^/])>/gm, '$1/>')
		.replace(/<img([^>]+)>/gi, '<img$1/>')
		.replace(/<br>/g, '<br/>')
		.replace(/\/static\//g, '/material-ui-static/')
		.replace(/<!-- #default-branch-switch -->/g, '')
		.replace(/<ul>/g, '<ul className="space-y-16">')
		.replace(/<ul start="(\d+)">/g, '<ul className="space-y-16" start={$1}>')
		.replace(/<ol start="(\d+)">/g, '<ol start={$1}>');

	return { htmlCode, importPaths: importPathList.join('\n') };
}

function eraseMdSection(content: string, folderName: string, requestedDir: string, title: string) {
	if (folderName !== requestedDir) {
		return content;
	}

	const regex = new RegExp(`## ${title}[\\s\\S]*?(?=##)`, 'g');
	return content.replace(regex, '');
}

function readDir(dir: string) {
	return new Promise<{ dir: string; list: string[] }>((resolve, reject) => {
		fs.readdir(dir, (err, list) => {
			if (err) {
				reject(err);
			}

			resolve({
				dir,
				list
			});
		});
	});
}

function writePages(dir: string, list: string[]): Promise<string[]> {
	const pages: string[] = [];
	return new Promise<string[]>((resolve, reject) => {
		list.forEach((file: string) => {
			file = path.resolve(dir, file);
			pages.push(path.basename(file));

			fs.stat(file, (err: NodeJS.ErrnoException | null, stat: fs.Stats) => {
				if (err) {
					// Handle the error if needed
					reject(err);
					return;
				}

				if (stat && stat.isDirectory()) {
					writePage(file);
				}
			});
		});

		resolve(pages);
	});
}

function writePage(fileDir: string) {
	const mdFileName = `${path.basename(fileDir)}.md`;
	const markdownSource = fs.readFileSync(`${fileDir}/${mdFileName}`, 'utf8');
	const fileName = _.upperFirst(_.camelCase(path.basename(fileDir)));
	const { htmlCode, importPaths } = getHtmlCode(markdownSource, fileDir);

	const componentContent = `
'use client';

import FuseExample from '@fuse/core/FuseExample';
import FuseHighlight from '@fuse/core/FuseHighlight';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import Typography from '@mui/material/Typography';
${importPaths}

function ${fileName}Doc(props) {
	return (
		<>
			<Button 
				className="normal-case absolute right-0 not-prose"
				variant="contained"
				color="secondary"
				component="a" 
				href="https://mui.com/components/${path.basename(fileDir)}" 
				target="_blank"
				role="button"
				size="small"
				startIcon={<FuseSvgIcon size={16}>heroicons-outline:arrow-top-right-on-square</FuseSvgIcon>}
			>
				Reference
			</Button>
			${htmlCode}
		</>
	);
}

export default ${fileName}Doc;
`;

	const pageContent = `import ${fileName}Doc from './${fileName}Doc';

export default ${fileName}Doc;
`;

	const targetDir = path.resolve(pagesDirectory, path.basename(fileDir));
	fs.mkdirSync(targetDir, { recursive: true });

	// Write the component file
	fs.writeFileSync(path.resolve(targetDir, `${fileName}Doc.tsx`), componentContent);

	// Write the page file
	fs.writeFileSync(path.resolve(targetDir, 'page.tsx'), pageContent);
}

function writeRouteFile(pages: string[]) {
	const imports = pages.map((page) => {
		const componentName = _.upperFirst(_.camelCase(page));
		return `import ${componentName} from './doc/${page}';`;
	});

	const routes = pages.map((page) => {
		const componentName = _.upperFirst(_.camelCase(page));
		return `
			{
				path: '/documentation/material-ui-components/${page}',
				component: ${componentName}
			}`;
	});

	const content = `
		import { lazy } from 'react';
		import { Navigate } from 'react-router-dom';
		import DocumentationPageLayout from '../DocumentationPageLayout';
        
        ${imports.join('')}
        
        const routes = [
			{
				path: '/documentation/material-ui-components',
				component: DocumentationPageLayout,
				children: [
					{
						path: '',
						component: () => <Navigate to="/documentation/material-ui-components/accordion" />
					},
					${routes.join(',')}
				]
			}
		];
        
        export default routes;
        `;
	fs.writeFileSync(path.resolve(routesFilePath), content);
}

function writeNavigationFile(pages: string[]) {
	const navigation = pages.map((page) => {
		const componentName = _.startCase(page);
		return `
			{
				id: '${_.camelCase(page)}',
				title: '${componentName}',
				type: 'item',
				url: '/documentation/material-ui-components/doc/${page}'
			}`;
	});

	const content = `
        const MaterialUIComponentsNavigation = {
			id: 'material-ui-components',
			title: 'Material UI Components',
			type: 'collapse',
			icon: 'layers',
			children: [${navigation.join(',')}]
		};
												
        export default MaterialUIComponentsNavigation;
        `;
	fs.writeFileSync(path.resolve(navigationFilePath), content);
}

function filewalker(dir: string) {
	return new Promise<string[]>((resolve, reject) => {
		let results: string[] = [];

		fs.readdir(dir, (err, list) => {
			if (err) {
				reject(err);
				return;
			}

			let pending = list.length;

			if (!pending) {
				resolve(results);
				return;
			}

			list.forEach((file) => {
				file = path.resolve(dir, file);

				fs.stat(file, (_err, stat) => {
					if (_err) {
						reject(_err);
						return;
					}

					// If directory, make a recursive call
					if (stat && stat.isDirectory()) {
						filewalker(file)
							.then((__res) => {
								results = results.concat(__res);
								pending -= 1;

								if (!pending) {
									resolve(results);
								}
							})
							.catch(reject);
					} else {
						results.push(file);
						pending -= 1;

						if (!pending) {
							resolve(results);
						}
					}
				});
			});
		});
	});
}

async function replaceInExamples() {
	const list = await filewalker(demoDir);

	list.forEach((file) => {
		const fileSource = fsp.readFile(file, 'utf8');

		fileSource.then((result) => {
			result = result
				.replace(
					'docs/src/modules/components/HighlightedCode',
					'@/app/(public)/documentation/material-ui-components/utils/HighlightedCode'
				)
				.replace(
					'@mui/docs/HighlightedCode',
					'@/app/(public)/documentation/material-ui-components/utils/HighlightedCode'
				)
				.replace(
					/docs\/src\/modules\/utils\/compose/g,
					'@/app/(public)/documentation/material-ui-components/utils/compose'
				)
				.replace(
					/docs\/src\/modules\/components\/MarkdownElement/g,
					'@/app/(public)/documentation/material-ui-components/utils/MarkdownElement'
				)
				.replace(
					/docs\/src\/modules\/components\/HighlightedCode/g,
					'@/app/(public)/documentation/material-ui-components/utils/HighlightedCode'
				)
				.replace(/\/static\//g, '/material-ui-static/')
				.replace(/## Experimental API[\s\S]*$/, ''); // Remove experimental API

			try {
				fsp.writeFile(file, result, 'utf8');
			} catch (writeErr) {
				// console.error(writeErr);
			}
		});
	});
}

async function removeExcludedComponents() {
	const excludedComponents = [
		path.resolve(examplesDirectory, './hidden'),
		path.resolve(examplesDirectory, './use-media-query'),
		path.resolve(examplesDirectory, './about-the-lab'),
		path.resolve(examplesDirectory, './material-icons'),
		path.resolve(examplesDirectory, './icons'),
		path.resolve(examplesDirectory, './portal'),
		path.resolve(examplesDirectory, './textarea-autosize'),
		path.resolve(examplesDirectory, './no-ssr')
	];

	try {
		excludedComponents.forEach(async (_path) => rmDir(_path));
	} catch (writeErr: unknown) {
		log(writeErr);
	}
}

async function removeUnnecessaryFiles() {
	return filewalker(demoDir)
		.then((list) => {
			return list.forEach(async (file) => {
				const extToRemove = [
					'.preview',
					'.tsx.preview',
					// '.js',
					// '.jsx',
					'-de.md',
					'-es.md',
					'-fr.md',
					'-ja.md',
					'-pt.md',
					'-ru.md',
					'-zh.md'
				];

				extToRemove.forEach(async (str) => {
					if (str && file?.endsWith(str)) {
						await removeFile(file);
					}
				});
			});
		})
		.catch((err) => {
			if (err) {
				throw err;
			}
		});
}

async function componentFileTypeCorrection() {
	return filewalker(examplesDirectory)
		.then(async (list) => {
			list.forEach(async (filePath) => {
				if (path.extname(filePath) === '.js') {
					/** if there is tsx version of the file, remove js file */
					const newFilePath = filePath.replace('.js', '.tsx');

					if (fs.existsSync(newFilePath)) {
						await removeFile(filePath);
						log(`Removed ${filePath}`);
					}
					// const newFilePath = filePath.replace('.js', '.jsx');

					// await renameFilePath(filePath, newFilePath);
					// log(`Renamed ${filePath} to ${newFilePath}`);

					await removeFile(filePath);
				}
			});
		})
		.catch((err) => {
			if (err) {
				throw err;
			}
		});
}

async function build() {
	log('Start building...');

	await rmDir(pagesDirectory);

	log('PagesDirectory removed.');

	await removeExcludedComponents();

	log('Exclude components removed.');

	await removeFile(path.resolve(examplesDirectory, './.eslintrc.js'));

	log('Eslint file removed.');

	await removeUnnecessaryFiles();

	log('Unnecessary files removed.');

	await componentFileTypeCorrection();

	await replaceInExamples();

	log('Replace in examples done.');

	fs.mkdirSync(pagesDirectory);

	log('PagesDirectory created.');

	readDir(examplesDirectory).then(({ dir: _dir, list }) => {
		writePages(_dir, list).then((pages) => {
			log('Route file created.');

			writeNavigationFile(pages);

			log('Navigation file created.');

			log('Done');
		});
	});
}

function runCommand(command: string, args: string[]) {
	return new Promise((resolve, reject) => {
		const process = spawn(command, args);
		process.on('close', (code) => {
			if (code !== 0) {
				reject(new Error(`Command "${command}" exited with code ${code}`));
				return;
			}

			resolve();
		});
	});
}

function log(message: unknown, message2?: unknown) {
	// eslint-disable-next-line no-console
	console.info(message, message2);
}

build();
