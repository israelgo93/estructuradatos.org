import { ExplanationData } from "./interactive-explanation"

// Datos de explicación para Binary Tree
export const BINARY_TREE_EXPLANATION_DATA: ExplanationData = {
	title: "Binary Search Tree (BST)",
	titleEs: "Árbol Binario de Búsqueda (BST)",
	description: "A hierarchical data structure where each node has at most two children, with left child smaller and right child larger than the parent.",
	descriptionEs: "Una estructura de datos jerárquica donde cada nodo tiene como máximo dos hijos, con el hijo izquierdo menor y el derecho mayor que el padre.",
	concepts: [
		{
			id: "bst-property",
			title: "BST Property",
			titleEs: "Propiedad BST",
			content: "In a Binary Search Tree, for every node: all values in the left subtree are smaller, and all values in the right subtree are larger. This property enables efficient searching.",
			contentEs: "En un Árbol Binario de Búsqueda, para cada nodo: todos los valores en el subárbol izquierdo son menores, y todos los valores en el subárbol derecho son mayores. Esta propiedad permite búsquedas eficientes.",
			tips: [
				"In-order traversal gives sorted output",
				"Duplicates are typically not allowed or go to one specific side"
			],
			tipsEs: [
				"El recorrido in-orden da salida ordenada",
				"Los duplicados típicamente no se permiten o van a un lado específico"
			]
		},
		{
			id: "insert",
			title: "Insert Operation",
			titleEs: "Operación de Inserción",
			content: "To insert a value, we compare it with each node starting from the root. If smaller, go left; if larger, go right. Continue until we find an empty spot.",
			contentEs: "Para insertar un valor, lo comparamos con cada nodo empezando desde la raíz. Si es menor, vamos a la izquierda; si es mayor, a la derecha. Continuamos hasta encontrar un espacio vacío.",
			code: `def insert(self, value):
    if self.root is None:
        self.root = Node(value)
        return
    
    current = self.root
    while True:
        if value < current.data:
            if current.left is None:
                current.left = Node(value)
                return
            current = current.left
        else:
            if current.right is None:
                current.right = Node(value)
                return
            current = current.right`,
			complexity: { time: "O(log n) avg, O(n) worst", space: "O(h) recursion" },
			tips: [
				"Average case assumes balanced tree",
				"Worst case occurs with sorted input (degenerates to linked list)"
			],
			tipsEs: [
				"El caso promedio asume árbol balanceado",
				"El peor caso ocurre con entrada ordenada (degenera en lista enlazada)"
			]
		},
		{
			id: "traversals",
			title: "Tree Traversals",
			titleEs: "Recorridos del Árbol",
			content: "There are three main ways to traverse a binary tree: In-order (Left, Root, Right), Pre-order (Root, Left, Right), and Post-order (Left, Right, Root).",
			contentEs: "Hay tres formas principales de recorrer un árbol binario: In-orden (Izquierda, Raíz, Derecha), Pre-orden (Raíz, Izquierda, Derecha), y Post-orden (Izquierda, Derecha, Raíz).",
			code: `# In-order: da salida ordenada
def inorder(self, node):
    if node is None:
        return
    self.inorder(node.left)      # L
    print(node.data)             # R (Root)
    self.inorder(node.right)     # R (Right)

# Pre-order: útil para copiar árbol
def preorder(self, node):
    if node is None:
        return
    print(node.data)             # R (Root)
    self.preorder(node.left)     # L
    self.preorder(node.right)    # R (Right)`,
			complexity: { time: "O(n)", space: "O(h)" }
		},
		{
			id: "height-balance",
			title: "Height and Balance",
			titleEs: "Altura y Balance",
			content: "The height of a tree is the longest path from root to leaf. A balanced tree has roughly equal heights on both sides, ensuring O(log n) operations.",
			contentEs: "La altura de un árbol es el camino más largo desde la raíz hasta una hoja. Un árbol balanceado tiene alturas aproximadamente iguales en ambos lados, asegurando operaciones O(log n).",
			tips: [
				"Perfect balance: every level is fully filled except possibly the last",
				"Self-balancing trees (AVL, Red-Black) maintain balance automatically"
			],
			tipsEs: [
				"Balance perfecto: cada nivel está completamente lleno excepto posiblemente el último",
				"Árboles auto-balanceados (AVL, Red-Black) mantienen el balance automáticamente"
			]
		}
	],
	useCases: [
		{
			title: "Database Indexing",
			titleEs: "Indexación de Bases de Datos",
			description: "B-trees (a variant) are used in databases for efficient data retrieval.",
			descriptionEs: "Los B-trees (una variante) se usan en bases de datos para recuperación eficiente de datos."
		},
		{
			title: "File Systems",
			titleEs: "Sistemas de Archivos",
			description: "Directory structures are often represented as trees.",
			descriptionEs: "Las estructuras de directorios a menudo se representan como árboles."
		},
		{
			title: "Expression Parsing",
			titleEs: "Análisis de Expresiones",
			description: "Compilers use expression trees to evaluate mathematical expressions.",
			descriptionEs: "Los compiladores usan árboles de expresiones para evaluar expresiones matemáticas."
		},
		{
			title: "Autocomplete",
			titleEs: "Autocompletado",
			description: "Trie trees (a variant) power autocomplete features in search engines.",
			descriptionEs: "Los árboles Trie (una variante) potencian el autocompletado en motores de búsqueda."
		}
	],
	quiz: [
		{
			id: "q1",
			question: "In a BST, where do smaller values go?",
			questionEs: "En un BST, ¿dónde van los valores menores?",
			options: ["Right subtree", "Left subtree", "Either side", "Root"],
			optionsEs: ["Subárbol derecho", "Subárbol izquierdo", "Cualquier lado", "Raíz"],
			correctIndex: 1,
			explanation: "In a BST, values smaller than a node go to its left subtree.",
			explanationEs: "En un BST, los valores menores que un nodo van a su subárbol izquierdo."
		},
		{
			id: "q2",
			question: "What traversal gives sorted output in a BST?",
			questionEs: "¿Qué recorrido da salida ordenada en un BST?",
			options: ["Pre-order", "Post-order", "In-order", "Level-order"],
			optionsEs: ["Pre-orden", "Post-orden", "In-orden", "Por niveles"],
			correctIndex: 2,
			explanation: "In-order traversal (Left, Root, Right) produces sorted output.",
			explanationEs: "El recorrido in-orden (Izquierda, Raíz, Derecha) produce salida ordenada."
		},
		{
			id: "q3",
			question: "What is the worst-case time complexity for BST search?",
			questionEs: "¿Cuál es la complejidad temporal del peor caso para búsqueda en BST?",
			options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
			optionsEs: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
			correctIndex: 2,
			explanation: "Worst case O(n) occurs when the tree degenerates into a linked list.",
			explanationEs: "El peor caso O(n) ocurre cuando el árbol degenera en una lista enlazada."
		}
	]
}

// Datos de explicación para AVL Tree
export const AVL_TREE_EXPLANATION_DATA: ExplanationData = {
	title: "AVL Tree (Self-Balancing BST)",
	titleEs: "Árbol AVL (BST Auto-Balanceado)",
	description: "A self-balancing binary search tree where the heights of the two child subtrees differ by at most one.",
	descriptionEs: "Un árbol binario de búsqueda auto-balanceado donde las alturas de los dos subárboles hijos difieren como máximo en uno.",
	concepts: [
		{
			id: "balance-factor",
			title: "Balance Factor",
			titleEs: "Factor de Balance",
			content: "The balance factor of a node is the height of its left subtree minus the height of its right subtree. In an AVL tree, this must be -1, 0, or 1 for every node.",
			contentEs: "El factor de balance de un nodo es la altura de su subárbol izquierdo menos la altura de su subárbol derecho. En un árbol AVL, esto debe ser -1, 0, o 1 para cada nodo.",
			code: `def get_balance(self, node):
    if node is None:
        return 0
    return self.height(node.left) - self.height(node.right)

# Valid balance factors: -1, 0, 1
# If |balance| > 1, rotation is needed`,
			tips: [
				"Balance factor > 1: left-heavy",
				"Balance factor < -1: right-heavy"
			],
			tipsEs: [
				"Factor de balance > 1: pesado a la izquierda",
				"Factor de balance < -1: pesado a la derecha"
			]
		},
		{
			id: "rotations",
			title: "Rotations",
			titleEs: "Rotaciones",
			content: "When the balance factor violates the AVL property, we perform rotations to restore balance. There are four cases: Left-Left, Right-Right, Left-Right, and Right-Left.",
			contentEs: "Cuando el factor de balance viola la propiedad AVL, realizamos rotaciones para restaurar el balance. Hay cuatro casos: Izquierda-Izquierda, Derecha-Derecha, Izquierda-Derecha, y Derecha-Izquierda.",
			code: `# Rotación derecha (para caso II)
def right_rotate(self, y):
    x = y.left
    T2 = x.right
    
    x.right = y
    y.left = T2
    
    y.height = 1 + max(self.height(y.left), self.height(y.right))
    x.height = 1 + max(self.height(x.left), self.height(x.right))
    
    return x`,
			complexity: { time: "O(1)", space: "O(1)" },
			tips: [
				"LL case: single right rotation",
				"RR case: single left rotation",
				"LR case: left then right rotation",
				"RL case: right then left rotation"
			],
			tipsEs: [
				"Caso II: rotación simple derecha",
				"Caso DD: rotación simple izquierda",
				"Caso ID: rotación izquierda luego derecha",
				"Caso DI: rotación derecha luego izquierda"
			]
		},
		{
			id: "insert-avl",
			title: "AVL Insertion",
			titleEs: "Inserción AVL",
			content: "Insert like in a regular BST, then update heights and check balance factors going back up to the root. Perform rotations if needed.",
			contentEs: "Insertar como en un BST regular, luego actualizar alturas y verificar factores de balance subiendo hasta la raíz. Realizar rotaciones si es necesario.",
			complexity: { time: "O(log n)", space: "O(log n)" }
		}
	],
	useCases: [
		{
			title: "Database Indexing",
			titleEs: "Indexación de Bases de Datos",
			description: "Where guaranteed O(log n) operations are critical.",
			descriptionEs: "Donde operaciones O(log n) garantizadas son críticas."
		},
		{
			title: "Memory Management",
			titleEs: "Gestión de Memoria",
			description: "Operating systems use balanced trees for memory allocation.",
			descriptionEs: "Los sistemas operativos usan árboles balanceados para asignación de memoria."
		}
	],
	quiz: [
		{
			id: "q1",
			question: "What are valid balance factors in an AVL tree?",
			questionEs: "¿Cuáles son factores de balance válidos en un árbol AVL?",
			options: ["-2, -1, 0, 1, 2", "-1, 0, 1", "0, 1", "Any integer"],
			optionsEs: ["-2, -1, 0, 1, 2", "-1, 0, 1", "0, 1", "Cualquier entero"],
			correctIndex: 1,
			explanation: "AVL trees maintain balance factors of -1, 0, or 1 for all nodes.",
			explanationEs: "Los árboles AVL mantienen factores de balance de -1, 0, o 1 para todos los nodos."
		},
		{
			id: "q2",
			question: "When is a left rotation performed?",
			questionEs: "¿Cuándo se realiza una rotación izquierda?",
			options: ["Tree is left-heavy", "Tree is right-heavy", "Tree is balanced", "Never"],
			optionsEs: ["Árbol pesado a la izquierda", "Árbol pesado a la derecha", "Árbol balanceado", "Nunca"],
			correctIndex: 1,
			explanation: "Left rotation is performed when the tree is right-heavy (balance factor < -1).",
			explanationEs: "La rotación izquierda se realiza cuando el árbol está pesado a la derecha (factor de balance < -1)."
		}
	]
}

// Datos de explicación para Linked List
export const LINKED_LIST_EXPLANATION_DATA: ExplanationData = {
	title: "Linked List",
	titleEs: "Lista Enlazada",
	description: "A linear data structure where elements are stored in nodes, each pointing to the next node in the sequence.",
	descriptionEs: "Una estructura de datos lineal donde los elementos se almacenan en nodos, cada uno apuntando al siguiente nodo en la secuencia.",
	concepts: [
		{
			id: "node-structure",
			title: "Node Structure",
			titleEs: "Estructura del Nodo",
			content: "Each node contains two parts: data (the value stored) and a pointer/reference to the next node. The last node points to NULL.",
			contentEs: "Cada nodo contiene dos partes: datos (el valor almacenado) y un puntero/referencia al siguiente nodo. El último nodo apunta a None.",
			code: `class Node:
    def __init__(self, data):
        self.data = data
        self.next = None  # Puntero al siguiente nodo

# Para lista doblemente enlazada:
class DNode:
    def __init__(self, data):
        self.data = data
        self.prev = None  # Puntero al anterior
        self.next = None  # Puntero al siguiente`
		},
		{
			id: "types",
			title: "Types of Linked Lists",
			titleEs: "Tipos de Listas Enlazadas",
			content: "SLL (Singly): one-way traversal. DLL (Doubly): two-way traversal. CSLL (Circular Singly): last points to first. CDLL (Circular Doubly): combines both.",
			contentEs: "SLL (Simple): recorrido unidireccional. DLL (Doble): recorrido bidireccional. CSLL (Circular Simple): el último apunta al primero. CDLL (Circular Doble): combina ambos.",
			tips: [
				"SLL: Simple, less memory, but no backward traversal",
				"DLL: More flexible, but uses more memory for prev pointer",
				"Circular: Useful for round-robin scheduling"
			],
			tipsEs: [
				"SLL: Simple, menos memoria, pero sin recorrido hacia atrás",
				"DLL: Más flexible, pero usa más memoria para puntero prev",
				"Circular: Útil para planificación round-robin"
			]
		},
		{
			id: "operations",
			title: "Common Operations",
			titleEs: "Operaciones Comunes",
			content: "Insert at front O(1), Insert at back O(n) or O(1) with tail pointer, Delete O(n) to find + O(1) to remove, Search O(n).",
			contentEs: "Insertar al inicio O(1), Insertar al final O(n) u O(1) con puntero tail, Eliminar O(n) para encontrar + O(1) para remover, Buscar O(n).",
			code: `# Insertar al inicio - O(1)
def insert_front(self, value):
    new_node = Node(value)
    new_node.next = self.head
    self.head = new_node

# Insertar al final - O(n) sin puntero tail
def insert_back(self, value):
    new_node = Node(value)
    if self.head is None:
        self.head = new_node
        return
    
    current = self.head
    while current.next is not None:
        current = current.next
    current.next = new_node`,
			complexity: { time: "O(1) front, O(n) back", space: "O(1)" }
		}
	],
	useCases: [
		{
			title: "Dynamic Memory Allocation",
			titleEs: "Asignación Dinámica de Memoria",
			description: "Operating systems use linked lists to track free memory blocks.",
			descriptionEs: "Los sistemas operativos usan listas enlazadas para rastrear bloques de memoria libres."
		},
		{
			title: "Undo Functionality",
			titleEs: "Funcionalidad Deshacer",
			description: "Applications use doubly linked lists to navigate forward and backward through states.",
			descriptionEs: "Las aplicaciones usan listas doblemente enlazadas para navegar adelante y atrás entre estados."
		},
		{
			title: "Music Playlists",
			titleEs: "Listas de Reproducción",
			description: "Circular linked lists are perfect for playlist loops.",
			descriptionEs: "Las listas circulares son perfectas para bucles de playlist."
		},
		{
			title: "Hash Table Chaining",
			titleEs: "Encadenamiento en Tablas Hash",
			description: "Linked lists handle collisions in hash tables.",
			descriptionEs: "Las listas enlazadas manejan colisiones en tablas hash."
		}
	],
	comparisons: [
		{
			structure: "Linked List vs Array",
			structureEs: "Lista Enlazada vs Array",
			pros: [
				"Dynamic size - grows as needed",
				"Efficient insertion/deletion at front O(1)",
				"No wasted memory (allocated as needed)"
			],
			prosEs: [
				"Tamaño dinámico - crece según necesidad",
				"Inserción/eliminación eficiente al inicio O(1)",
				"Sin memoria desperdiciada (se asigna según necesidad)"
			],
			cons: [
				"No random access - must traverse O(n)",
				"Extra memory for pointers",
				"Poor cache locality"
			],
			consEs: [
				"Sin acceso aleatorio - debe recorrer O(n)",
				"Memoria extra para punteros",
				"Pobre localidad de caché"
			]
		}
	],
	quiz: [
		{
			id: "q1",
			question: "What is the time complexity of inserting at the front?",
			questionEs: "¿Cuál es la complejidad temporal de insertar al inicio?",
			options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
			optionsEs: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
			correctIndex: 2,
			explanation: "Inserting at front is O(1) as we only update the head pointer.",
			explanationEs: "Insertar al inicio es O(1) ya que solo actualizamos el puntero head."
		},
		{
			id: "q2",
			question: "In a circular linked list, what does the last node point to?",
			questionEs: "En una lista circular, ¿a qué apunta el último nodo?",
			options: ["NULL", "Itself", "The head node", "A random node"],
			optionsEs: ["None", "A sí mismo", "El nodo cabeza", "Un nodo aleatorio"],
			correctIndex: 2,
			explanation: "In a circular linked list, the last node points back to the head.",
			explanationEs: "En una lista circular, el último nodo apunta de vuelta a la cabeza."
		}
	]
}

// Datos de explicación para Heap
export const HEAP_EXPLANATION_DATA: ExplanationData = {
	title: "Heap (Priority Queue)",
	titleEs: "Montículo (Cola de Prioridad)",
	description: "A complete binary tree that satisfies the heap property: parent is greater (max-heap) or smaller (min-heap) than children.",
	descriptionEs: "Un árbol binario completo que satisface la propiedad de montículo: el padre es mayor (max-heap) o menor (min-heap) que los hijos.",
	concepts: [
		{
			id: "heap-property",
			title: "Heap Property",
			titleEs: "Propiedad del Montículo",
			content: "In a max-heap, every parent is greater than or equal to its children. In a min-heap, every parent is smaller than or equal to its children. This ensures the root is always the maximum (or minimum).",
			contentEs: "En un max-heap, cada padre es mayor o igual que sus hijos. En un min-heap, cada padre es menor o igual que sus hijos. Esto asegura que la raíz siempre sea el máximo (o mínimo).",
			tips: [
				"Max-heap: root is the largest element",
				"Min-heap: root is the smallest element",
				"Complete tree: all levels filled except possibly the last"
			],
			tipsEs: [
				"Max-heap: la raíz es el elemento más grande",
				"Min-heap: la raíz es el elemento más pequeño",
				"Árbol completo: todos los niveles llenos excepto posiblemente el último"
			]
		},
		{
			id: "array-representation",
			title: "Array Representation",
			titleEs: "Representación en Array",
			content: "Heaps are efficiently stored in arrays. For a node at index i: parent is at (i-1)/2, left child is at 2i+1, right child is at 2i+2.",
			contentEs: "Los montículos se almacenan eficientemente en arrays. Para un nodo en índice i: el padre está en (i-1)/2, hijo izquierdo en 2i+1, hijo derecho en 2i+2.",
			code: `# Representación en array del heap
heap = []
size = 0

# Padre, hijo izquierdo, hijo derecho
def parent(i):
    return (i - 1) // 2

def left(i):
    return 2 * i + 1

def right(i):
    return 2 * i + 2`
		},
		{
			id: "heapify",
			title: "Heapify Operation",
			titleEs: "Operación Heapify",
			content: "Heapify maintains the heap property by 'sinking' or 'floating' elements to their correct position.",
			contentEs: "Heapify mantiene la propiedad del montículo 'hundiendo' o 'flotando' elementos a su posición correcta.",
			code: `# Heapify hacia abajo (para max-heap)
def heapify_down(self, arr, n, i):
    largest = i
    l = 2 * i + 1
    r = 2 * i + 2
    
    if l < n and arr[l] > arr[largest]:
        largest = l
    if r < n and arr[r] > arr[largest]:
        largest = r
    
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        self.heapify_down(arr, n, largest)`,
			complexity: { time: "O(log n)", space: "O(log n) recursion" }
		}
	],
	useCases: [
		{
			title: "Priority Queues",
			titleEs: "Colas de Prioridad",
			description: "Tasks processed by priority, not arrival order.",
			descriptionEs: "Tareas procesadas por prioridad, no por orden de llegada."
		},
		{
			title: "Heap Sort",
			titleEs: "Ordenamiento Heap Sort",
			description: "Efficient O(n log n) sorting algorithm using heap.",
			descriptionEs: "Algoritmo de ordenamiento eficiente O(n log n) usando heap."
		},
		{
			title: "Dijkstra's Algorithm",
			titleEs: "Algoritmo de Dijkstra",
			description: "Min-heap efficiently extracts the minimum distance vertex.",
			descriptionEs: "Min-heap extrae eficientemente el vértice con distancia mínima."
		},
		{
			title: "Median Finding",
			titleEs: "Encontrar la Mediana",
			description: "Two heaps can maintain a running median efficiently.",
			descriptionEs: "Dos heaps pueden mantener una mediana móvil eficientemente."
		}
	],
	quiz: [
		{
			id: "q1",
			question: "In a max-heap, where is the largest element?",
			questionEs: "En un max-heap, ¿dónde está el elemento más grande?",
			options: ["Last position", "Root", "Random position", "Middle"],
			optionsEs: ["Última posición", "Raíz", "Posición aleatoria", "Medio"],
			correctIndex: 1,
			explanation: "In a max-heap, the largest element is always at the root.",
			explanationEs: "En un max-heap, el elemento más grande siempre está en la raíz."
		},
		{
			id: "q2",
			question: "What is the time complexity of extracting the max from a max-heap?",
			questionEs: "¿Cuál es la complejidad temporal de extraer el máximo de un max-heap?",
			options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
			optionsEs: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
			correctIndex: 1,
			explanation: "Extract max is O(log n) because we need to heapify after removing root.",
			explanationEs: "Extraer máximo es O(log n) porque necesitamos heapify después de remover la raíz."
		}
	]
}

// Datos de explicación para Dijkstra
export const DIJKSTRA_EXPLANATION_DATA: ExplanationData = {
	title: "Dijkstra's Algorithm",
	titleEs: "Algoritmo de Dijkstra",
	description: "A greedy algorithm that finds the shortest path from a source vertex to all other vertices in a weighted graph with non-negative edges.",
	descriptionEs: "Un algoritmo voraz que encuentra el camino más corto desde un vértice origen a todos los demás vértices en un grafo ponderado con aristas no negativas.",
	concepts: [
		{
			id: "relaxation",
			title: "Edge Relaxation",
			titleEs: "Relajación de Aristas",
			content: "The core operation of Dijkstra's. For an edge (u,v) with weight w: if distance[u] + w < distance[v], update distance[v]. This 'relaxes' the path to v.",
			contentEs: "La operación central de Dijkstra. Para una arista (u,v) con peso w: si distancia[u] + w < distancia[v], actualizar distancia[v]. Esto 'relaja' el camino a v.",
			code: `# Relajación de arista
def relax(self, u, v, weight):
    if self.dist[u] + weight < self.dist[v]:
        self.dist[v] = self.dist[u] + weight
        self.parent[v] = u  # Para reconstruir camino`,
			tips: [
				"Relaxation is the key operation for shortest path algorithms",
				"We only update if we find a shorter path"
			],
			tipsEs: [
				"La relajación es la operación clave para algoritmos de camino más corto",
				"Solo actualizamos si encontramos un camino más corto"
			]
		},
		{
			id: "algorithm",
			title: "Algorithm Steps",
			titleEs: "Pasos del Algoritmo",
			content: "1. Initialize distances (source=0, others=∞). 2. Use a priority queue to always process the vertex with minimum distance. 3. For each neighbor, try to relax the edge. 4. Mark vertex as visited.",
			contentEs: "1. Inicializar distancias (origen=0, otros=∞). 2. Usar cola de prioridad para siempre procesar el vértice con distancia mínima. 3. Para cada vecino, intentar relajar la arista. 4. Marcar vértice como visitado.",
			code: `import heapq

def dijkstra(self, source):
    # Inicializar distancias
    dist = {v: float('inf') for v in self.graph}
    dist[source] = 0
    
    # Cola de prioridad (min-heap)
    pq = [(0, source)]
    
    while pq:
        d, u = heapq.heappop(pq)
        
        # Procesar todos los vecinos
        for v, weight in self.graph[u]:
            # Relajación
            if dist[u] + weight < dist[v]:
                dist[v] = dist[u] + weight
                heapq.heappush(pq, (dist[v], v))
    
    return dist`,
			complexity: { time: "O((V+E) log V)", space: "O(V)" }
		},
		{
			id: "limitations",
			title: "Limitations",
			titleEs: "Limitaciones",
			content: "Dijkstra's algorithm does NOT work with negative edge weights. For negative weights, use Bellman-Ford algorithm instead.",
			contentEs: "El algoritmo de Dijkstra NO funciona con pesos de aristas negativos. Para pesos negativos, usar el algoritmo Bellman-Ford en su lugar.",
			tips: [
				"Only works with non-negative weights",
				"Greedy choice: always pick minimum distance vertex",
				"Cannot detect negative cycles"
			],
			tipsEs: [
				"Solo funciona con pesos no negativos",
				"Elección voraz: siempre elegir vértice con distancia mínima",
				"No puede detectar ciclos negativos"
			]
		}
	],
	useCases: [
		{
			title: "GPS Navigation",
			titleEs: "Navegación GPS",
			description: "Compute shortest routes using weights like distance or travel time.",
			descriptionEs: "Calcular rutas más cortas usando pesos como distancia o tiempo de viaje."
		},
		{
			title: "Network Routing",
			titleEs: "Enrutamiento de Redes",
			description: "OSPF computes lowest-cost paths between routers based on link weights.",
			descriptionEs: "OSPF calcula caminos de menor costo entre routers usando pesos de enlaces."
		},
		{
			title: "Social Networks",
			titleEs: "Redes Sociales",
			description: "Find the minimal connection chain between users in weighted graphs.",
			descriptionEs: "Encontrar la cadena mínima de conexiones entre usuarios en grafos ponderados."
		},
		{
			title: "Game AI",
			titleEs: "IA de Videojuegos",
			description: "Pathfinding on navigation meshes where weights represent terrain cost.",
			descriptionEs: "Búsqueda de caminos en mallas de navegación con costos de terreno."
		}
	],
	quiz: [
		{
			id: "q1",
			question: "Can Dijkstra's algorithm handle negative edge weights?",
			questionEs: "¿Puede el algoritmo de Dijkstra manejar pesos de aristas negativos?",
			options: ["Yes", "No", "Only with modifications", "Only for directed graphs"],
			optionsEs: ["Sí", "No", "Solo con modificaciones", "Solo para grafos dirigidos"],
			correctIndex: 1,
			explanation: "Dijkstra's algorithm cannot handle negative edge weights. Use Bellman-Ford instead.",
			explanationEs: "El algoritmo de Dijkstra no puede manejar pesos negativos. Usar Bellman-Ford en su lugar."
		},
		{
			id: "q2",
			question: "What data structure makes Dijkstra's algorithm efficient?",
			questionEs: "¿Qué estructura de datos hace eficiente el algoritmo de Dijkstra?",
			options: ["Stack", "Queue", "Priority Queue (Min-Heap)", "Array"],
			optionsEs: ["Pila", "Cola", "Cola de Prioridad (Min-Heap)", "Array"],
			correctIndex: 2,
			explanation: "A priority queue (min-heap) allows O(log V) extraction of minimum distance vertex.",
			explanationEs: "Una cola de prioridad (min-heap) permite extracción O(log V) del vértice con distancia mínima."
		}
	]
}

// Datos de explicación para Message Queue
export const MESSAGE_QUEUE_EXPLANATION_DATA: ExplanationData = {
	title: "Message Queue System",
	titleEs: "Sistema de Cola de Mensajes",
	description: "A queue-based architecture for asynchronous communication between distributed system components.",
	descriptionEs: "Una arquitectura basada en colas para comunicación asíncrona entre componentes de sistemas distribuidos.",
	concepts: [
		{
			id: "producer-consumer",
			title: "Producer-Consumer Pattern",
			titleEs: "Patrón Productor-Consumidor",
			content: "Producers create messages and add them to the queue. Consumers retrieve and process messages. This decouples the sender from the receiver.",
			contentEs: "Los productores crean mensajes y los añaden a la cola. Los consumidores recuperan y procesan mensajes. Esto desacopla al emisor del receptor.",
			tips: [
				"Producers and consumers can work at different speeds",
				"Queue acts as a buffer between them",
				"Enables horizontal scaling"
			],
			tipsEs: [
				"Productores y consumidores pueden trabajar a diferentes velocidades",
				"La cola actúa como buffer entre ellos",
				"Permite escalado horizontal"
			]
		},
		{
			id: "async-communication",
			title: "Asynchronous Communication",
			titleEs: "Comunicación Asíncrona",
			content: "The producer doesn't wait for the consumer to process the message. It just adds to the queue and continues. This improves system responsiveness.",
			contentEs: "El productor no espera a que el consumidor procese el mensaje. Solo lo añade a la cola y continúa. Esto mejora la capacidad de respuesta del sistema."
		},
		{
			id: "reliability",
			title: "Reliability Features",
			titleEs: "Características de Fiabilidad",
			content: "Message queues provide durability (messages persist), acknowledgments (confirm processing), and retries (reprocess failed messages).",
			contentEs: "Las colas de mensajes proporcionan durabilidad (mensajes persisten), confirmaciones (confirmar procesamiento), y reintentos (reprocesar mensajes fallidos)."
		}
	],
	useCases: [
		{
			title: "Microservices Communication",
			titleEs: "Comunicación de Microservicios",
			description: "Orders publish events; inventory and email services consume asynchronously.",
			descriptionEs: "Pedidos publican eventos; inventario y correo consumen de forma asíncrona."
		},
		{
			title: "Event-Driven Architecture",
			titleEs: "Arquitectura Dirigida por Eventos",
			description: "A user signup triggers analytics, billing, and welcome emails via the queue.",
			descriptionEs: "Un registro de usuario dispara analítica, facturación y emails vía cola."
		},
		{
			title: "Load Leveling",
			titleEs: "Nivelación de Carga",
			description: "Queues smooth traffic spikes and let workers scale horizontally.",
			descriptionEs: "Las colas suavizan picos y permiten escalar workers horizontalmente."
		}
	],
	quiz: [
		{
			id: "q1",
			question: "What does the producer do after sending a message?",
			questionEs: "¿Qué hace el productor después de enviar un mensaje?",
			options: [
				"Waits for consumer to process",
				"Continues immediately",
				"Blocks until queue is empty",
				"Deletes the message"
			],
			optionsEs: [
				"Espera a que el consumidor procese",
				"Continúa inmediatamente",
				"Se bloquea hasta que la cola esté vacía",
				"Elimina el mensaje"
			],
			correctIndex: 1,
			explanation: "In async messaging, the producer continues immediately after enqueuing.",
			explanationEs: "En mensajería asíncrona, el productor continúa inmediatamente después de encolar."
		}
	]
}

// Datos de explicación para Polynomial Multiplication
export const POLYNOMIAL_EXPLANATION_DATA: ExplanationData = {
	title: "Polynomial Multiplication",
	titleEs: "Multiplicación de Polinomios",
	description: "Multiply two polynomials represented as linked lists, where each node stores a coefficient and exponent.",
	descriptionEs: "Multiplicar dos polinomios representados como listas enlazadas, donde cada nodo almacena un coeficiente y exponente.",
	concepts: [
		{
			id: "representation",
			title: "Polynomial Representation",
			titleEs: "Representación de Polinomios",
			content: "Each term is a node with coefficient and exponent. For example, 3x² + 2x + 1 has nodes: (3,2) → (2,1) → (1,0).",
			contentEs: "Cada término es un nodo con coeficiente y exponente. Por ejemplo, 3x² + 2x + 1 tiene nodos: (3,2) → (2,1) → (1,0).",
			code: `class Term:
    def __init__(self, coeff, exp):
        self.coeff = coeff    # Coeficiente
        self.exp = exp        # Exponente
        self.next = None

# Ejemplo: 3x² + 2x + 1
# (3,2) → (2,1) → (1,0) → None`
		},
		{
			id: "multiplication",
			title: "Multiplication Algorithm",
			titleEs: "Algoritmo de Multiplicación",
			content: "Multiply each term of the first polynomial with each term of the second. For (a,m) × (b,n): result is (a×b, m+n). Then combine like terms.",
			contentEs: "Multiplicar cada término del primer polinomio con cada término del segundo. Para (a,m) × (b,n): resultado es (a×b, m+n). Luego combinar términos semejantes.",
			code: `# Multiplicar dos términos
# (3x²) × (2x) = (3×2)x^(2+1) = 6x³

def multiply_terms(t1, t2):
    return Term(
        t1.coeff * t2.coeff,  # Multiplicar coeficientes
        t1.exp + t2.exp       # Sumar exponentes
    )`,
			complexity: { time: "O(n × m)", space: "O(n × m)" },
			tips: [
				"Coefficients multiply",
				"Exponents add",
				"Don't forget to combine like terms at the end"
			],
			tipsEs: [
				"Los coeficientes se multiplican",
				"Los exponentes se suman",
				"No olvides combinar términos semejantes al final"
			]
		}
	],
	useCases: [
		{
			title: "Signal Processing",
			titleEs: "Procesamiento de Señales",
			description: "Convolution for digital filters uses polynomial multiplication.",
			descriptionEs: "La convolución para filtros digitales usa multiplicación de polinomios."
		},
		{
			title: "Cryptography",
			titleEs: "Criptografía",
			description: "Lattice-based schemes rely on efficient polynomial arithmetic.",
			descriptionEs: "Esquemas basados en retículas dependen de aritmética polinomial eficiente."
		}
	],
	quiz: [
		{
			id: "q1",
			question: "When multiplying (2x³) × (3x²), what is the exponent of the result?",
			questionEs: "Al multiplicar (2x³) × (3x²), ¿cuál es el exponente del resultado?",
			options: ["6", "5", "1", "2"],
			optionsEs: ["6", "5", "1", "2"],
			correctIndex: 1,
			explanation: "Exponents add when multiplying: 3 + 2 = 5. Result is 6x⁵.",
			explanationEs: "Los exponentes se suman al multiplicar: 3 + 2 = 5. Resultado es 6x⁵."
		}
	]
}
