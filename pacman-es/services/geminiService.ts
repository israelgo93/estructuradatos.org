// Servicio de comentarios para el juego Pac-Man
// Nota: La integración con Gemini AI requiere configuración del servidor

export async function getGameCommentary(event: string, score: number): Promise<string> {
	// Comentarios predefinidos basados en eventos del juego
	const comments: Record<string, string[]> = {
		pellet: [
			"DATOS RECOLECTADOS. MATRIZ ACTUALIZADA.",
			"PUNTO CAPTURADO. ÍNDICE INCREMENTADO.",
			"NODO PROCESADO EN O(1)."
		],
		powerPellet: [
			"MODO POWER ACTIVADO. TABLAS INVERTIDAS.",
			"ESTADO FSM: CAZADOR ACTIVO.",
			"ALGORITMO DE PERSECUCIÓN INVERTIDO."
		],
		ghostClose: [
			"ALERTA: ENTIDAD HOSTIL EN RADIO CERCANO.",
			"BFS DETECTA AMENAZA PRÓXIMA.",
			"RUTA DE ESCAPE CALCULANDO..."
		],
		ghostEaten: [
			"FANTASMA NEUTRALIZADO. +200 PUNTOS.",
			"NODO ENEMIGO ELIMINADO DE LA COLA.",
			"VICTORIA TÁCTICA REGISTRADA."
		],
		collision: [
			"ERROR FATAL: COLISIÓN DETECTADA.",
			"GAME OVER. REINICIANDO MATRIZ...",
			"VIDA PERDIDA. STACK DECREMENTADO."
		],
		victory: [
			"NIVEL COMPLETADO. GRAFO LIMPIADO.",
			"VICTORIA TOTAL. TODAS LAS RUTAS EXPLORADAS.",
			"MISIÓN CUMPLIDA. BFS EXITOSO."
		],
		default: [
			"SISTEMA OPERATIVO NOMINAL.",
			"PROCESANDO DATOS DEL LABERINTO.",
			"ALGORITMOS EN EJECUCIÓN."
		]
	};

	// Seleccionar categoría basada en el evento
	let category = "default";
	const eventLower = event.toLowerCase();
	
	if (eventLower.includes("pellet") && !eventLower.includes("power")) {
		category = "pellet";
	} else if (eventLower.includes("power")) {
		category = "powerPellet";
	} else if (eventLower.includes("cerca") || eventLower.includes("close")) {
		category = "ghostClose";
	} else if (eventLower.includes("neutraliza") || eventLower.includes("eaten")) {
		category = "ghostEaten";
	} else if (eventLower.includes("colisión") || eventLower.includes("collision")) {
		category = "collision";
	} else if (eventLower.includes("victoria") || eventLower.includes("victory")) {
		category = "victory";
	}

	// Seleccionar comentario aleatorio de la categoría
	const categoryComments = comments[category];
	const randomIndex = Math.floor(Math.random() * categoryComments.length);
	
	return categoryComments[randomIndex];
}
