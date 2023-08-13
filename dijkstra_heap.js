function MinHeap() {
	this.heap = [];

	this.insert = function (value) {
		this.heap.push(value);
		this.bubbleUp();
	};

	this.bubbleUp = function () {
		let index = this.heap.length - 1;
		const current = this.heap[index];
		while (index > 0) {
			const parentIdx = Math.floor((index - 1) / 2);
			const parent = this.heap[parentIdx];
			if (parent.거리 <= current.거리) break;
			this.heap[parentIdx] = current;
			this.heap[index] = parent;
			index = parentIdx;
		}
	};

	this.extractMin = function () {
		const min = this.heap[0];
		const end = this.heap.pop();
		if (this.heap.length > 0) {
			this.heap[0] = end;
			this.sinkDown();
		}
		return min;
	};

	this.sinkDown = function () {
		let idx = 0;
		const length = this.heap.length;
		const element = this.heap[0];
		while (true) {
			const leftChildIdx = 2 * idx + 1;
			const rightChildIdx = 2 * idx + 2;
			let leftChild, rightChild;
			let swap = null;

			if (leftChildIdx < length) {
				leftChild = this.heap[leftChildIdx];
				if (leftChild.거리 < element.거리) {
					swap = leftChildIdx;
				}
			}
			if (rightChildIdx < length) {
				rightChild = this.heap[rightChildIdx];
				if (
					(swap === null && rightChild.거리 < element.거리) ||
					(swap !== null && rightChild.거리 < leftChild.거리)
				) {
					swap = rightChildIdx;
				}
			}
			if (swap === null) break;
			this.heap[idx] = this.heap[swap];
			this.heap[swap] = element;
			idx = swap;
		}
	};
}

function dijkstra(그래프, 시작정점) {
	const 정점수 = 그래프.length;
	const 거리 = Array(정점수).fill(Infinity);
	const 힙 = new MinHeap();
	const 지역이름 = ['서울', '원주', '포항', '수원', '대전', '여수'];

	거리[시작정점] = 0;
	힙.insert({ 정점: 시작정점, 거리: 거리[시작정점] });

	while (힙.heap.length > 0) {
		console.log('힙에서 현제 확정지은 거리의 수 : ' + (지역이름.length - 힙.heap.length));
		const 현재 = 힙.extractMin();

		const 현재정점 = 현재.정점;
		const 현재거리 = 현재.거리;

		if (거리[현재정점] < 현재거리) continue;

		console.log(`다음 여행지로 ${지역이름[현재정점]}를 선택함`);

		for (let i = 0; i < 정점수; i++) {
			if (그래프[현재정점][i] !== 0 && 그래프[현재정점][i] !== Infinity) {
				const 새거리 = 현재거리 + 그래프[현재정점][i];
				if (새거리 < 거리[i]) {
					console.log(
						`${지역이름[현재정점]}에서 ${지역이름[i]}로 가는 거리를 파악해보자: ${새거리} (원래 거리: ${거리[i]})`,
					);
					거리[i] = 새거리;
					힙.insert({ 정점: i, 거리: 새거리 });
				}
			}
		}

		console.log('-------------------');
		console.log('거리: ', 거리);
		지역이름.forEach((지역, 인덱스) => console.log(`${지역}: ${거리[인덱스]}`));
		console.log('-------------------');
		console.log('최소 힙을 구하고 있습니다.');
		console.log('-------------------');
		힙.heap.forEach((정점) => console.log(`${지역이름[정점.정점]}: ${정점.거리}`));
		console.log('-------------------');
	}

	return 거리;
}

const 그래프 = [
	[0, 2, 5, 1, Infinity, Infinity],
	[2, 0, 3, 2, Infinity, Infinity],
	[5, 3, 0, 3, 1, 5],
	[1, 2, 3, 0, 1, Infinity],
	[Infinity, Infinity, 1, 1, 0, 2],
	[Infinity, Infinity, 5, Infinity, 2, 0],
];
const 시작정점 = 0;
const 최단거리 = dijkstra(그래프, 시작정점);
const 지역이름 = ['서울', '원주', '포항', '수원', '대전', '여수'];
console.log(`시작 정점(${지역이름[시작정점]})에서 다른 모든 정점까지의 최단 거리:`, 최단거리);
