class PriorityQueue {
	constructor() {
		this.items = [];
	}
	//[{ element: 'a', priority: 5 }, { element: 'b', priority: 2 }, { element: 'c', priority: 3}}]
	// [ "B", "C", "A"]의 순서로 큐가 정렬되어야 함
	enqueue(element, priority) {
		// 큐의 맨 뒤에 item을 추가 // 시간복잡도 O(n)
		const item = { element, priority };

		let added = false; // added가 true가 되면 for문을 빠져나감 (중요도가 높은 item이 큐의 앞에 위치하게 됨)

		for (let i = 0; i < this.items.length; i++) {
			// itesm[0] = { element: 'a', priority: 5 }
			// input item = { element: 'b', priority: 2 }
			// [ ..., (input) { element: 'b', priority: 2 }, (shift){ element: 'a', priority: 5 }, ...]
			if (item.priority < this.items[i].priority) {
				this.items.splice(i, 0, item); // i번째에 item을 추가하고, 기존 i번째부터 뒤로 한칸씩 밀어냄
				added = true; // for문을 빠져나가기 위한 flag
				break;
			}
		}

		if (!added) {
			// for문을 빠져나가지 않았다면, added는 false
			this.items.push(item); // for문을 빠져나가지 않았다면, 큐의 맨 뒤에 item을 추가
		}
	}

	dequeue() {
		// 큐의 맨 앞에 있는 item을 반환하고, 큐에서 삭제 // 시간복잡도 O(1)
		if (!this.isEmpty()) {
			return this.items.shift(); // 큐의 맨 앞에 있는 item을 반환하고, 큐에서 삭제
		} else {
			return 'Queue is empty!'; // 큐가 비어있다면, 에러 메시지 출력 후 종료 (원래는 NULL을 반환해야 함)
		}
	}

	peek() {
		// 큐의 맨 앞에 있는 item을 반환 // 시간복잡도 O(1)
		if (!this.isEmpty()) {
			return this.items[0]; // 큐의 맨 앞에 있는 item을 반환
		} else {
			return 'Queue is empty!'; // 큐가 비어있다면, 에러 메시지 출력 후 종료 (원래는 NULL을 반환해야 함)
		}
	}

	isEmpty() {
		// 큐가 비어있는지 확인 시간복잡도 O(1)
		return this.items.length == 0; // 큐의 길이가 0이면 비어있는 것
	}

	clear() {
		// 큐를 비움 시간복잡도 O(1)
		this.items = [];
	}

	printQueue() {
		// 큐를 출력 시간복잡도 O(n)
		return this.items.map((item) => `${item.element} : ${item.priority}`);
	}

	sizeOfQueue() {
		// 큐의 길이를 반환 // 시간복잡도 O(1)
		return this.items.length;
	}
}

let myqueue = new PriorityQueue();

myqueue.enqueue('A', 5);
console.log(myqueue.printQueue());
myqueue.enqueue('B', 2);
console.log(myqueue.printQueue());
myqueue.enqueue('C', 3);
console.log(myqueue.printQueue());
myqueue.enqueue('D', 1);
console.log(myqueue.printQueue()); // D,B,C,A

myqueue.dequeue();
console.log(myqueue.printQueue()); // B,C,A
