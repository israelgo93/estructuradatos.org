import { Code2, Cpu, Gauge, Database } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";

export const TechStack = () => {
	const { t } = useTranslation();

	return (
		<div className="w-full py-20 lg:py-40">
			<div className="container mx-auto">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
					<div className="flex gap-4 flex-col items-start">
						<div>
							<Badge>{t('landing.techStackBadge')}</Badge>
						</div>
						<div className="flex gap-2 flex-col">
							<h2 className="text-xl md:text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-regular text-left">
								{t('landing.techStackTitle')}
							</h2>
							<p className="text-lg lg:max-w-sm leading-relaxed tracking-tight text-muted-foreground text-left">
								{t('landing.techStackDescription')}
							</p>
						</div>
					</div>
					<div className="flex justify-center items-center">
						<div className="grid text-left grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 w-full gap-2">
							<div className="flex gap-0 flex-col justify-between p-6 border rounded-md">
								<Code2 className="w-4 h-4 mb-10 text-primary" />
								<h2 className="text-2xl tracking-tighter max-w-xl text-left font-regular">
									{t('landing.techCardNextTitle')}
								</h2>
								<p className="text-base leading-relaxed tracking-tight text-muted-foreground max-w-xl text-left">
									{t('landing.techCardNextDesc')}
								</p>
							</div>
							<div className="flex gap-0 flex-col justify-between p-6 border rounded-md">
								<Cpu className="w-4 h-4 mb-10 text-primary" />
								<h2 className="text-2xl tracking-tighter max-w-xl text-left font-regular">
									{t('landing.techCardThreeTitle')}
								</h2>
								<p className="text-base leading-relaxed tracking-tight text-muted-foreground max-w-xl text-left">
									{t('landing.techCardThreeDesc')}
								</p>
							</div>
							<div className="flex gap-0 flex-col justify-between p-6 border rounded-md">
								<Gauge className="w-4 h-4 mb-10 text-primary" />
								<h2 className="text-2xl tracking-tighter max-w-xl text-left font-regular">
									{t('landing.techCardAnimationsTitle')}
								</h2>
								<p className="text-base leading-relaxed tracking-tight text-muted-foreground max-w-xl text-left">
									{t('landing.techCardAnimationsDesc')}
								</p>
							</div>
							<div className="flex gap-0 flex-col justify-between p-6 border rounded-md">
								<Database className="w-4 h-4 mb-10 text-primary" />
								<h2 className="text-2xl tracking-tighter max-w-xl text-left font-regular">
									{t('landing.techCardUiTitle')}
								</h2>
								<p className="text-base leading-relaxed tracking-tight text-muted-foreground max-w-xl text-left">
									{t('landing.techCardUiDesc')}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};