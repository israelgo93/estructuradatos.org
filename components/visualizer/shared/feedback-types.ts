// Tipos para el sistema de feedback educativo

export type FeedbackStepType = 
	| 'info' 
	| 'comparison' 
	| 'assignment' 
	| 'pointer-change' 
	| 'traversal' 
	| 'success' 
	| 'warning'
	| 'complexity'

export interface FeedbackStep {
	id: string
	type: FeedbackStepType
	title: string
	titleEs: string
	description: string
	descriptionEs: string
	code?: string
	highlight?: string
	timestamp: number
}

export interface OperationFeedback {
	operationName: string
	operationNameEs: string
	steps: FeedbackStep[]
	complexity: {
		time: string
		space: string
		explanation: string
		explanationEs: string
	}
	currentStepIndex: number
	isComplete: boolean
}

export interface FeedbackContext {
	structureType: 'stack' | 'queue' | 'linkedList' | 'binaryTree' | 'avlTree' | 'heap' | 'dijkstra'
	currentOperation: OperationFeedback | null
	history: OperationFeedback[]
}

// Plantillas de feedback para cada estructura de datos
export const STACK_FEEDBACK_TEMPLATES = {
	push: {
		operationName: 'Push',
		operationNameEs: 'Insertar (Push)',
		complexity: {
			time: 'O(1)',
			space: 'O(1)',
			explanation: 'Push operation adds an element to the top in constant time since we only modify the top pointer.',
			explanationEs: 'La operación Push añade un elemento en la cima en tiempo constante ya que solo modificamos el puntero superior.'
		},
		getSteps: (value: number, newSize: number): FeedbackStep[] => [
			{
				id: 'check-overflow',
				type: 'comparison',
				title: 'Check for Overflow',
				titleEs: 'Verificar Desbordamiento',
				description: `Verify if stack has space. Current size: ${newSize - 1}, checking if full...`,
				descriptionEs: `Verificar si la pila tiene espacio. Tamaño actual: ${newSize - 1}, verificando si está llena...`,
				code: 'if len(self.items) >= self.max_size:\n    raise Exception("Stack Overflow!")',
				timestamp: Date.now()
			},
			{
				id: 'increment-top',
				type: 'assignment',
				title: 'Increment Top Pointer',
				titleEs: 'Incrementar Puntero Superior',
				description: `Move top pointer from ${newSize - 2} to ${newSize - 1}`,
				descriptionEs: `Mover puntero top de ${newSize - 2} a ${newSize - 1}`,
				code: 'self.top = self.top + 1',
				timestamp: Date.now()
			},
			{
				id: 'assign-value',
				type: 'assignment',
				title: 'Assign Value',
				titleEs: 'Asignar Valor',
				description: `Store value ${value} at position stack[${newSize - 1}]`,
				descriptionEs: `Almacenar valor ${value} en posición stack[${newSize - 1}]`,
				code: `self.items.append(${value})`,
				timestamp: Date.now()
			},
			{
				id: 'success',
				type: 'success',
				title: 'Push Complete',
				titleEs: 'Push Completado',
				description: `Value ${value} successfully added to the stack. New size: ${newSize}`,
				descriptionEs: `Valor ${value} añadido exitosamente a la pila. Nuevo tamaño: ${newSize}`,
				timestamp: Date.now()
			}
		]
	},
	pop: {
		operationName: 'Pop',
		operationNameEs: 'Extraer (Pop)',
		complexity: {
			time: 'O(1)',
			space: 'O(1)',
			explanation: 'Pop operation removes the top element in constant time since we only modify the top pointer.',
			explanationEs: 'La operación Pop elimina el elemento superior en tiempo constante ya que solo modificamos el puntero superior.'
		},
		getSteps: (value: number, newSize: number): FeedbackStep[] => [
			{
				id: 'check-underflow',
				type: 'comparison',
				title: 'Check for Underflow',
				titleEs: 'Verificar Subdesbordamiento',
				description: `Verify if stack has elements. Current size: ${newSize + 1}`,
				descriptionEs: `Verificar si la pila tiene elementos. Tamaño actual: ${newSize + 1}`,
				code: 'if len(self.items) == 0:\n    raise Exception("Stack Underflow!")',
				timestamp: Date.now()
			},
			{
				id: 'get-value',
				type: 'assignment',
				title: 'Retrieve Value',
				titleEs: 'Obtener Valor',
				description: `Get value ${value} from position stack[${newSize}]`,
				descriptionEs: `Obtener valor ${value} de posición stack[${newSize}]`,
				code: `value = self.items[-1]  # ${value}`,
				timestamp: Date.now()
			},
			{
				id: 'decrement-top',
				type: 'assignment',
				title: 'Decrement Top Pointer',
				titleEs: 'Decrementar Puntero Superior',
				description: `Move top pointer from ${newSize} to ${newSize - 1}`,
				descriptionEs: `Mover puntero top de ${newSize} a ${newSize - 1}`,
				code: 'return self.items.pop()',
				timestamp: Date.now()
			},
			{
				id: 'success',
				type: 'success',
				title: 'Pop Complete',
				titleEs: 'Pop Completado',
				description: `Value ${value} successfully removed. New size: ${newSize}`,
				descriptionEs: `Valor ${value} eliminado exitosamente. Nuevo tamaño: ${newSize}`,
				timestamp: Date.now()
			}
		]
	}
}

export const QUEUE_FEEDBACK_TEMPLATES = {
	enqueue: {
		operationName: 'Enqueue',
		operationNameEs: 'Encolar (Enqueue)',
		complexity: {
			time: 'O(1)',
			space: 'O(1)',
			explanation: 'Enqueue adds an element at the rear in constant time.',
			explanationEs: 'Encolar añade un elemento al final en tiempo constante.'
		},
		getSteps: (value: number, newSize: number): FeedbackStep[] => [
			{
				id: 'check-full',
				type: 'comparison',
				title: 'Check if Queue is Full',
				titleEs: 'Verificar si Cola está Llena',
				description: `Verify queue has space. Current size: ${newSize - 1}`,
				descriptionEs: `Verificar si la cola tiene espacio. Tamaño actual: ${newSize - 1}`,
				code: 'if len(self.items) >= self.max_size:\n    raise Exception("Queue Overflow!")',
				timestamp: Date.now()
			},
			{
				id: 'increment-rear',
				type: 'assignment',
				title: 'Increment Rear Pointer',
				titleEs: 'Incrementar Puntero Final',
				description: `Move rear pointer to position ${newSize - 1}`,
				descriptionEs: `Mover puntero rear a posición ${newSize - 1}`,
				code: 'self.rear = self.rear + 1',
				timestamp: Date.now()
			},
			{
				id: 'assign-value',
				type: 'assignment',
				title: 'Assign Value',
				titleEs: 'Asignar Valor',
				description: `Store value ${value} at queue[${newSize - 1}]`,
				descriptionEs: `Almacenar valor ${value} en queue[${newSize - 1}]`,
				code: `self.items.append(${value})`,
				timestamp: Date.now()
			},
			{
				id: 'success',
				type: 'success',
				title: 'Enqueue Complete',
				titleEs: 'Encolar Completado',
				description: `Value ${value} added to queue. New size: ${newSize}`,
				descriptionEs: `Valor ${value} añadido a la cola. Nuevo tamaño: ${newSize}`,
				timestamp: Date.now()
			}
		]
	},
	dequeue: {
		operationName: 'Dequeue',
		operationNameEs: 'Desencolar (Dequeue)',
		complexity: {
			time: 'O(1)',
			space: 'O(1)',
			explanation: 'Dequeue removes the front element in constant time.',
			explanationEs: 'Desencolar elimina el elemento del frente en tiempo constante.'
		},
		getSteps: (value: number, newSize: number): FeedbackStep[] => [
			{
				id: 'check-empty',
				type: 'comparison',
				title: 'Check if Queue is Empty',
				titleEs: 'Verificar si Cola está Vacía',
				description: `Verify queue has elements. Current size: ${newSize + 1}`,
				descriptionEs: `Verificar si la cola tiene elementos. Tamaño actual: ${newSize + 1}`,
				code: 'if len(self.items) == 0:\n    raise Exception("Queue Underflow!")',
				timestamp: Date.now()
			},
			{
				id: 'get-value',
				type: 'assignment',
				title: 'Retrieve Front Value',
				titleEs: 'Obtener Valor del Frente',
				description: `Get value ${value} from front of queue`,
				descriptionEs: `Obtener valor ${value} del frente de la cola`,
				code: `value = self.items[0]  # ${value}`,
				timestamp: Date.now()
			},
			{
				id: 'increment-front',
				type: 'assignment',
				title: 'Increment Front Pointer',
				titleEs: 'Incrementar Puntero Frontal',
				description: 'Move front pointer to next element',
				descriptionEs: 'Mover puntero front al siguiente elemento',
				code: 'return self.items.pop(0)',
				timestamp: Date.now()
			},
			{
				id: 'success',
				type: 'success',
				title: 'Dequeue Complete',
				titleEs: 'Desencolar Completado',
				description: `Value ${value} removed. New size: ${newSize}`,
				descriptionEs: `Valor ${value} eliminado. Nuevo tamaño: ${newSize}`,
				timestamp: Date.now()
			}
		]
	}
}

export const BINARY_TREE_FEEDBACK_TEMPLATES = {
	insert: {
		operationName: 'Insert',
		operationNameEs: 'Insertar',
		complexity: {
			time: 'O(log n) average, O(n) worst',
			space: 'O(log n) for recursion stack',
			explanation: 'In a balanced BST, we halve the search space at each step. Worst case occurs with a skewed tree.',
			explanationEs: 'En un BST balanceado, reducimos el espacio de búsqueda a la mitad en cada paso. El peor caso ocurre con un árbol degenerado.'
		},
		getSteps: (value: number, comparisons: { nodeValue: number, direction: 'left' | 'right' }[]): FeedbackStep[] => {
			const steps: FeedbackStep[] = [
				{
					id: 'start',
					type: 'info',
					title: 'Start Insertion',
					titleEs: 'Iniciar Inserción',
					description: `Inserting value ${value} into the BST`,
					descriptionEs: `Insertando valor ${value} en el BST`,
					code: `self.insert(${value})`,
					timestamp: Date.now()
				}
			]

			comparisons.forEach((comp, index) => {
				const dirEs = comp.direction === 'left' ? 'izquierda' : 'derecha'
				steps.push({
					id: `compare-${index}`,
					type: 'comparison',
					title: `Compare with ${comp.nodeValue}`,
					titleEs: `Comparar con ${comp.nodeValue}`,
					description: `${value} ${comp.direction === 'left' ? '<' : '>'} ${comp.nodeValue}, go ${comp.direction}`,
					descriptionEs: `${value} ${comp.direction === 'left' ? '<' : '>'} ${comp.nodeValue}, ir a la ${dirEs}`,
					code: `if ${value} ${comp.direction === 'left' ? '<' : '>'} ${comp.nodeValue}:\n    go_${comp.direction}()`,
					timestamp: Date.now()
				})
			})

			steps.push({
				id: 'success',
				type: 'success',
				title: 'Insertion Complete',
				titleEs: 'Inserción Completada',
				description: `Value ${value} inserted successfully after ${comparisons.length} comparisons`,
				descriptionEs: `Valor ${value} insertado exitosamente después de ${comparisons.length} comparaciones`,
				timestamp: Date.now()
			})

			return steps
		}
	},
	traversal: {
		inorder: {
			operationName: 'In-Order Traversal',
			operationNameEs: 'Recorrido In-Orden',
			complexity: {
				time: 'O(n)',
				space: 'O(h) where h is height',
				explanation: 'Visits all nodes exactly once. In-order produces sorted output for BST.',
				explanationEs: 'Visita todos los nodos exactamente una vez. In-orden produce salida ordenada para BST.'
			}
		},
		preorder: {
			operationName: 'Pre-Order Traversal',
			operationNameEs: 'Recorrido Pre-Orden',
			complexity: {
				time: 'O(n)',
				space: 'O(h) where h is height',
				explanation: 'Visits root before children. Useful for creating a copy of the tree.',
				explanationEs: 'Visita la raíz antes que los hijos. Útil para crear una copia del árbol.'
			}
		},
		postorder: {
			operationName: 'Post-Order Traversal',
			operationNameEs: 'Recorrido Post-Orden',
			complexity: {
				time: 'O(n)',
				space: 'O(h) where h is height',
				explanation: 'Visits children before root. Useful for deleting the tree.',
				explanationEs: 'Visita los hijos antes que la raíz. Útil para eliminar el árbol.'
			}
		}
	}
}

export const LINKED_LIST_FEEDBACK_TEMPLATES = {
	insertFront: {
		operationName: 'Insert at Front',
		operationNameEs: 'Insertar al Inicio',
		complexity: {
			time: 'O(1)',
			space: 'O(1)',
			explanation: 'Insert at front only requires updating the head pointer.',
			explanationEs: 'Insertar al inicio solo requiere actualizar el puntero head.'
		},
		getSteps: (value: number): FeedbackStep[] => [
			{
				id: 'create-node',
				type: 'assignment',
				title: 'Create New Node',
				titleEs: 'Crear Nuevo Nodo',
				description: `Allocate memory for new node with value ${value}`,
				descriptionEs: `Asignar memoria para nuevo nodo con valor ${value}`,
				code: `new_node = Node(${value})`,
				timestamp: Date.now()
			},
			{
				id: 'link-next',
				type: 'pointer-change',
				title: 'Link to Current Head',
				titleEs: 'Enlazar a Cabeza Actual',
				description: 'Point new node\'s next to current head',
				descriptionEs: 'Apuntar next del nuevo nodo a la cabeza actual',
				code: 'new_node.next = self.head',
				timestamp: Date.now()
			},
			{
				id: 'update-head',
				type: 'pointer-change',
				title: 'Update Head Pointer',
				titleEs: 'Actualizar Puntero Head',
				description: 'Make new node the head',
				descriptionEs: 'Hacer del nuevo nodo la cabeza',
				code: 'self.head = new_node',
				timestamp: Date.now()
			},
			{
				id: 'success',
				type: 'success',
				title: 'Insert Complete',
				titleEs: 'Inserción Completada',
				description: `Node with value ${value} is now the head`,
				descriptionEs: `Nodo con valor ${value} es ahora la cabeza`,
				timestamp: Date.now()
			}
		]
	},
	insertBack: {
		operationName: 'Insert at Back',
		operationNameEs: 'Insertar al Final',
		complexity: {
			time: 'O(n) without tail pointer, O(1) with tail',
			space: 'O(1)',
			explanation: 'Must traverse to find the last node unless we maintain a tail pointer.',
			explanationEs: 'Debe recorrer para encontrar el último nodo a menos que mantengamos un puntero tail.'
		},
		getSteps: (value: number, listSize: number): FeedbackStep[] => [
			{
				id: 'create-node',
				type: 'assignment',
				title: 'Create New Node',
				titleEs: 'Crear Nuevo Nodo',
				description: `Allocate memory for new node with value ${value}`,
				descriptionEs: `Asignar memoria para nuevo nodo con valor ${value}`,
				code: `new_node = Node(${value})`,
				timestamp: Date.now()
			},
			{
				id: 'traverse',
				type: 'traversal',
				title: 'Traverse to End',
				titleEs: 'Recorrer hasta el Final',
				description: `Navigate through ${listSize} nodes to find tail`,
				descriptionEs: `Navegar a través de ${listSize} nodos para encontrar tail`,
				code: 'while current.next is not None:\n    current = current.next',
				timestamp: Date.now()
			},
			{
				id: 'link',
				type: 'pointer-change',
				title: 'Link New Node',
				titleEs: 'Enlazar Nuevo Nodo',
				description: 'Connect tail to new node',
				descriptionEs: 'Conectar tail al nuevo nodo',
				code: 'current.next = new_node',
				timestamp: Date.now()
			},
			{
				id: 'success',
				type: 'success',
				title: 'Insert Complete',
				titleEs: 'Inserción Completada',
				description: `Node with value ${value} added at the end`,
				descriptionEs: `Nodo con valor ${value} añadido al final`,
				timestamp: Date.now()
			}
		]
	}
}

export const DIJKSTRA_FEEDBACK_TEMPLATES = {
	relaxation: {
		operationName: 'Edge Relaxation',
		operationNameEs: 'Relajación de Arista',
		complexity: {
			time: 'O((V + E) log V) with priority queue',
			space: 'O(V)',
			explanation: 'Uses a greedy approach to find shortest paths. Each vertex is processed once.',
			explanationEs: 'Usa un enfoque voraz para encontrar caminos más cortos. Cada vértice se procesa una vez.'
		},
		getSteps: (from: string, to: string, weight: number, oldDist: number, newDist: number): FeedbackStep[] => [
			{
				id: 'check',
				type: 'comparison',
				title: 'Check Relaxation Condition',
				titleEs: 'Verificar Condición de Relajación',
				description: `Is distance[${from}] + ${weight} < distance[${to}]?`,
				descriptionEs: `¿Es distancia[${from}] + ${weight} < distancia[${to}]?`,
				code: `if dist[${from}] + ${weight} < dist[${to}]:`,
				timestamp: Date.now()
			},
			{
				id: 'update',
				type: 'assignment',
				title: 'Update Distance',
				titleEs: 'Actualizar Distancia',
				description: `Update distance to ${to} from ${oldDist === Infinity ? '∞' : oldDist} to ${newDist}`,
				descriptionEs: `Actualizar distancia a ${to} de ${oldDist === Infinity ? '∞' : oldDist} a ${newDist}`,
				code: `dist["${to}"] = ${newDist}`,
				timestamp: Date.now()
			},
			{
				id: 'parent',
				type: 'pointer-change',
				title: 'Update Parent',
				titleEs: 'Actualizar Padre',
				description: `Set parent of ${to} to ${from} for path reconstruction`,
				descriptionEs: `Establecer padre de ${to} como ${from} para reconstrucción del camino`,
				code: `parent["${to}"] = "${from}"`,
				timestamp: Date.now()
			}
		]
	}
}
