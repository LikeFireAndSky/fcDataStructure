class PriorityQueue {
	constructor() {
		this.heap = [null]; // 인덱스 0은 사용하지 않기 위해 null을 넣어준다.
		// 인덱스 1부터 사용하기 위해 null을 넣어준다.
	}

	/**Heap
	 * left child = parent * 2
	 * right child = parent * 2 + 1
	 * parent = child / 2
	 */

	insert(value) {
		this.heap.push(value);
		// 힙의 길이가 2 초과면 (힙의 길이가 2이면 1개만 들어있는 것이므로 비교할 필요가 없다.)
		if (this.heap.length > 2) {
			// 힙의 마지막 인덱스의 부모 인덱스를 구한다. (Math.floor(this.heap.length / 2)는 마지막 인덱스의 부모 인덱스이다.
			// parent = child / 2

			// current는 마지막 추가된 인덱스이다.
			let current = this.heap.length - 1;

			// 만약 비교해봤을 때 부모 인덱스의 값이 자식 인덱스의 값보다 크다면
			while (this.heap[current] < this.heap[Math.floor(current / 2)]) {
				// 부모 인덱스와 자식 인덱스의 값을 바꿔준다.
				if (current >= 1) {
					// 배열 구조 분해 할당
					// [a, b] = [b, a] => a와 b의 값을 바꿔준다.
					// 자식 인덱스와 부모 인덱스의 값을 바꿔준다.
					// heap[current] = 자식 인덱스의 값
					// heap[Math.floor(current / 2)] = 부모 인덱스의 값
					[
						([this.heap[Math.floor(current / 2)], this.heap[current]] = [
							this.heap[current],
							this.heap[Math.floor(current / 2)],
						]),
					];

					// 부모 인덱스로 이동한다.
					// 부모노드가 Root노드가 아니라면
					if (Math.floor(current / 2) > 1) {
						// current는 부모 인덱스로 이동한다.
						current = Math.floor(current / 2);
					} else {
						break;
					}
				}
			}
		}
	}

	remove() {
		if (this.heap.length <= 1) return null;

		// 최소값은 루트 노드이다.
		const minValue = this.heap[1];
		this.heap[1] = this.heap.pop();

		// 초기값
		let current = 1;
		let leftChild = current * 2;
		let rightChild = current * 2 + 1;

		// 왼쪽 자식이나 오른쪽 자식이 현재 값보다 작으면 계속 실행
		while (this.heap[leftChild] < this.heap[current] || this.heap[rightChild] < this.heap[current]) {
			// 왼쪽 자식이나 오른쪽 자식이 없으면 break
			if (!this.heap[leftChild] || !this.heap[rightChild]) break;

			// 왼쪽 자식이 오른쪽 자식보다 작으면 왼쪽 자식과 현재 값을 바꿔준다.
			if (this.heap[leftChild] < this.heap[rightChild]) {
				// 배열 구조 분해 할당
				[this.heap[current], this.heap[leftChild]] = [this.heap[leftChild], this.heap[current]];
				// 현재 위치를 왼쪽 자식으로 바꿔준다.
				current = leftChild;
			} else {
				// 오른쪽 자식이 왼쪽 자식보다 작으면 오른쪽 자식과 현재 값을 바꿔준다.
				[this.heap[current], this.heap[rightChild]] = [this.heap[rightChild], this.heap[current]];
				// 현재 위치를 오른쪽 자식으로 바꿔준다.
				current = rightChild;
			}

			// 왼쪽 자식과 오른쪽 자식의 인덱스를 다시 구한다.
			leftChild = current * 2;
			rightChild = current * 2 + 1;
			console.log(this.heap);
		}

		// 최소값을 반환한다.
		return minValue;
	}

	peek() {
		// 최소값은 루트 노드를 반환한다..
		return this.heap[1];
	}

	print() {
		return this.heap;
	}

	isEmpty() {
		return this.heap.length <= 1;
	}
}

const pq = new PriorityQueue();
pq.insert(5);
console.log(pq.print());
pq.insert(3);
console.log(pq.print());
pq.insert(8);
console.log(pq.print());

console.log(pq.remove());
console.log(pq.print());
console.log(pq.peek());
