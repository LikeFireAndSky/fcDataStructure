class PriorityQueue {
    constructor() {
        this.items = [];
    }

    enqueue(element, priority) {
        const item = { element, priority };
        let added = false;

        for (let i = 0; i < this.items.length; i++) {
            if (item.priority < this.items[i].priority) {
                this.items.splice(i, 0, item);
                added = true;
                break;
            }
        }

        if (!added) {
            this.items.push(item);
        }
    }

    dequeue() { // dequeue 메서드 추가
        return this.items.shift();
    }

    printQueue() {
        return this.items.map((item) => `${item.element} (Priority: ${item.priority})`);
    }
}

const queue = new PriorityQueue();

function enqueuePatient() {
    const patientName = document.getElementById('patient-name').value;
    const priority = parseInt(document.getElementById('priority').value);

    if (patientName && priority > 0) {
        queue.enqueue(patientName, priority);
        updateWaitingList();
    } else {
        alert('환자명을 똑바로 입력하세요!');
    }
}

function dequeuePatient() { // dequeuePatient 함수 추가
    const treatedPatient = queue.dequeue();
    if (treatedPatient) {
        alert(`${treatedPatient.element}님이 치료되었습니다.`);
        updateWaitingList();
    } else {
        alert('지금은 모두가 건강합니다!');
    }
}

function updateWaitingList() { // 대기 명단 업데이트를 위한 함수
    const waitingList = document.getElementById('waiting-list');
    waitingList.innerHTML = '';

    queue.printQueue().forEach((patient) => {
        const listItem = document.createElement('li');
        listItem.textContent = patient;
        waitingList.append(listItem);
    });
}
