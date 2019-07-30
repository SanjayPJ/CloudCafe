const cafeList = document.getElementById('cafe-list');
const form = document.getElementById('add-cafe-form');

const renderCafe = (item) => {
    // console.log(item.id);
    const child = `<li id="item" data-id="${item.id}"><span>${item.data().name}</span><span>${item.data().city}</span><div>x</div></li>`;
    cafeList.innerHTML += child;
}

// db.collection('cafes').get().then((snapshot) => {
//     snapshot.docs.map(item => {
//         renderCafe(item);
//     })
// })
// db.collection('cafes').where('city', '==', 'Kollam').get().then((snapshot) => {
//     snapshot.docs.map(item => {
//         renderCafe(item);
//     })
// })
// db.collection('cafes').where('city', '==', 'Kollam').orderBy('name').get().then((snapshot) => {
//     snapshot.docs.map(item => {
//         renderCafe(item);
//     })
// })



const clearField = () => {
    form.name.value = '';
    form.city.value = '';
}

form.addEventListener('submit', (e) => {
    console.log('Form Submitted...');

    if (form.name.value !== '' && form.city.value != '') {
        db.collection('cafes').add({
            name: form.name.value,
            city: form.city.value
        });

        clearField();
    }

    e.preventDefault();
});

cafeList.addEventListener('click', (e) => {
    if (e.target.textContent === 'x') {
        const id = e.target.parentElement.getAttribute('data-id');
        db.collection('cafes').doc(id).delete();
    };

    if (e.target.parentElement.id === 'item' || e.target.id === 'item') {
        let id;
        if (e.target.parentElement.id === 'item') {
            id = e.target.parentElement.getAttribute('data-id');
        } else {
            id = e.target.getAttribute('data-id');
        }

        db.collection('cafes').doc(id).get().then(item => {
            console.log(item.data());
        });
    };
})


db.collection('cafes').orderBy('name').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.map(change => {
        console.log(change);
        if (change.type == 'added') {
            renderCafe(change.doc);
        } else if (change.type == 'removed') {
            let li = cafeList.querySelector('[data-id=' + change.doc.id + ']');
            cafeList.removeChild(li);
        }
    })
})