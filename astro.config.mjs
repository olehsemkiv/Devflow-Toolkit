import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

export default defineConfig({
	integrations: [
		starlight({
			title: "Devflow Toolkit",
			description: "Документація та реюзні рішення для Webflow-команди",

			// Одинарна мова (UA) як root-локаль без префікса в URL
			locales: {
				root: { label: "Українська", lang: "uk" },
			},

			// Ваш сайдбар (можеш змінювати лінки/назви як хочеш)
			sidebar: [
				{
					label: "Start Here",
					items: [
						{ label: "Огляд", link: "/start-here/overview/" },
						{ label: "Як працюємо з Toolkit", link: "/start-here/workflow/" },
						{ label: "CDN & Releases", link: "/start-here/cdn-and-releases/" },
					],
				},
				{
					label: "Standards",
					items: [
						{ label: "Structure Guide", link: "/standards/structure-guide/" },
						{ label: "Naming & Conventions", link: "/standards/naming/" },
						{ label: "Typography", link: "/standards/typography/" },
					],
				},
				{
					label: "Modules",
					items: [
						{
							label: "UI",
							items: [
								{ label: "Modal Module", link: "/modules/ui/modal/" },
								{ label: "Accordion Module", link: "/modules/ui/accordion/" },
							],
						},
						{
							label: "Media",
							items: [{ label: "Custom Player", link: "/modules/media/plyr/" }],
						},
					],
				},
				{
					label: "Checklists",
					items: [{ label: "Optimization", link: "/modules/checklists/optimization/" }],
				},
				{
					label: "Templates",
					items: [
						{ label: "Module Template", link: "/templates/module-template/" },
						{ label: "Pattern Template", link: "/templates/pattern-template/" },
					],
				},
				{
					label: "Utilities",
					items: [
						{ label: "Smooth Scroll", link: "/utilities/smooth-scroll/" },
						{ label: "Scroll Bar", link: "/utilities/scroll-bar/" },
						{ label: "Splide", link: "/utilities/splide/" },
					],
				},
			],

			// Підключимо ваші кастомні стилі
			customCss: ["./src/styles/custom.css"],
		}),
	],
});

