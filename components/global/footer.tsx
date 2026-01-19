"use client"

import { useTranslation } from "react-i18next"

export function Footer() {
	const { t } = useTranslation()

	return (
		<footer className="border-t border-secondary/60 bg-card/40">
			<div className="mx-auto w-[90%] md:w-[70%] lg:w-[75%] lg:max-w-screen-xl py-6 text-sm text-muted-foreground flex flex-col gap-2">
				<p className="font-medium text-foreground">{t('footer.educationalProject')}</p>
				<p>{t('footer.methodology')}</p>
				<p>{t('footer.creator')}</p>
				<p>{t('footer.course')}</p>
				<p>{t('footer.faculty')}</p>
			</div>
		</footer>
	)
}
