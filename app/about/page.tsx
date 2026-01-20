"use client"

import dynamic from "next/dynamic"
import { useTranslation } from "react-i18next"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const Navbar = dynamic(() => import("@/components/navigation/navbar").then(mod => ({ default: mod.Navbar })), { ssr: false })

export default function AboutPage() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">{t('about.title', 'Acerca del Proyecto')}</h1>
        
			<div className="grid gap-6">
				<Card>
					<CardHeader>
						<CardTitle>{t('footer.educationalProject', 'Proyecto Educativo')}</CardTitle>
						<CardDescription>{t('footer.course', 'Estructura de Datos')}</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div>
							<h3 className="font-semibold mb-1">{t('about.methodology', 'Metodología')}</h3>
							<p className="text-muted-foreground">
								{t('footer.methodology', 'Aprendizaje basado en práctica con simulaciones 3D y análisis en tiempo real.')}
							</p>
						</div>
						
						<div>
							<h3 className="font-semibold mb-1">{t('about.institution', 'Institución')}</h3>
							<p className="text-muted-foreground">
								{t('footer.faculty', 'Facultad de Ciencias de la Vida y Tecnologías - ULEAM')}
							</p>
						</div>

						<div>
							<h3 className="font-semibold mb-1">{t('about.credits', 'Créditos')}</h3>
							<p className="text-muted-foreground">
								{t('about.contribution', 'Contribución al proyecto: Ing. Israel J. Gomez, Mgtr.')}
							</p>
							<p className="text-muted-foreground">
								{t('about.students', 'Estudiantes del 3 Nivel Paralelo C Asignatura Estructura de Datos & Docente')}
							</p>
						</div>
					</CardContent>
				</Card>
			</div>
      </main>
    </div>
  )
}
