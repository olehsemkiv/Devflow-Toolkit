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
					],
				},
				{
					label: "Standards",
					items: [
						{ label: "Structure Guide", link: "/standards/structure-guide/" },
						{ label: "Naming & Conventions", link: "/standards/naming/" },
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
							items: [{ label: "PLYR Module", link: "/modules/media/plyr/" }],
						},
					],
				},
				{
					label: "Checklists",
					items: [{ label: "Optimization", link: "/checklists/optimization/" }],
				},
				{
					label: "Templates",
					items: [
						{ label: "Module Template", link: "/templates/module-template/" },
						{ label: "Pattern Template", link: "/templates/pattern-template/" },
					],
				},
			],

			// Підключимо ваші кастомні стилі
			customCss: ["./src/styles/custom.css"],
		}),
	],
});

