document.addEventListener('DOMContentLoaded', function() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser === null || currentUser.role !== 'therapist') {
        window.location.href = 'login.html';
        return;
    }

    const currentLang = localStorage.getItem('app_lang') || 'ar';
    const taskForm = document.getElementById('sendTaskForm');
    const tasksContainer = document.getElementById('tasksContainer');
    const targetPatientSelect = document.getElementById('targetPatient');

    targetPatientSelect.innerHTML = '';
    let hasPatients = false;

    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key.includes('@')) {
            let user = JSON.parse(localStorage.getItem(key));
            if (user.role === 'parent' && user.doctorCode === currentUser.myDoctorCode) {
                let option = document.createElement('option');
                option.value = user.email; 
                option.textContent = user.name;
                targetPatientSelect.appendChild(option);
                hasPatients = true;
            }
        }
    }

    if (hasPatients === false) {
        let option = document.createElement('option');
        option.textContent = currentLang === 'ar' ? "لا يوجد مرضى مضافين بعد" : "No patients added yet";
        targetPatientSelect.appendChild(option);
        targetPatientSelect.disabled = true;
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('all_tasks')) || [];
        tasksContainer.innerHTML = '';

        let myTasks = tasks.filter(t => t.doctorEmail === currentUser.email).map((t, i) => ({ task: t, originalIndex: i }));

        if (myTasks.length === 0) {
            tasksContainer.innerHTML = `<p style="text-align:center; color:#888;">${currentLang === 'ar' ? 'لا توجد مهام مرسلة حتى الآن.' : 'No tasks sent yet.'}</p>`;
            return;
        }

        const txtTo = currentLang === 'ar' ? 'موجهة إلى:' : 'Assigned to:';
        const txtDelete = currentLang === 'ar' ? 'حذف 🗑️' : 'Delete 🗑️';

        myTasks.forEach(function(item) {
            let statusText = item.task.done 
                ? (currentLang === 'ar' ? 'تم الإنجاز ✅' : 'Completed ✅') 
                : (currentLang === 'ar' ? 'قيد الانتظار ⏳' : 'Pending ⏳');
            let statusClass = item.task.done ? 'status-completed' : 'status-pending';
            
            tasksContainer.innerHTML += `
                <div class="task-list-item">
                    <div>
                        <h3 style="color: var(--text-color);">${item.task.content}</h3>
                        <p style="font-size: 0.9rem; color: #888;">${txtTo} <strong>${item.task.patientName}</strong> | ${item.task.type}</p>
                    </div>
                    <div style="text-align: center;">
                        <span class="task-status ${statusClass}">
                            ${statusText}
                        </span>
                        <button onclick="deleteTask(${item.originalIndex})" style="background:none; border:none; color:#e74c3c; cursor:pointer; display:block; margin-top:10px; width:100%;">${txtDelete}</button>
                    </div>
                </div>
            `;
        });
    }

    taskForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (hasPatients === false) {
            alert(currentLang === 'ar' ? 'يجب أن يكون لديك مرضى أولاً لإرسال المهام.' : 'You must have patients first to assign tasks.');
            return;
        }

        let selectEl = document.getElementById('targetPatient');
        let selectedPatientName = selectEl.options[selectEl.selectedIndex].text;
        let taskTypeValue = document.getElementById('taskType').value;

        const newTask = {
            patientEmail: selectEl.value,
            patientName: selectedPatientName,
            doctorEmail: currentUser.email,
            type: taskTypeValue,
            category: taskTypeValue,
            content: document.getElementById('taskContent').value,
            done: false,
            date: new Date().toLocaleDateString()
        };

        let tasks = JSON.parse(localStorage.getItem('all_tasks')) || [];
        tasks.unshift(newTask);
        localStorage.setItem('all_tasks', JSON.stringify(tasks));
        
        alert(currentLang === 'ar' ? 'تم إرسال المهمة للبطل بنجاح! 🚀' : 'Task assigned to hero successfully! 🚀');
        taskForm.reset();
        loadTasks();
    });

    window.deleteTask = function(index) {
        if(confirm(currentLang === 'ar' ? 'هل أنت متأكد من حذف هذه المهمة؟' : 'Are you sure you want to delete this task?')) {
            let tasks = JSON.parse(localStorage.getItem('all_tasks'));
            tasks.splice(index, 1);
            localStorage.setItem('all_tasks', JSON.stringify(tasks));
            loadTasks();
        }
    };

    loadTasks();
});