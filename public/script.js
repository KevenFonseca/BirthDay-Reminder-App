const form = document.getElementById('form')

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    
    const userName = document.getElementById('username').value.trim()
    const email = document.getElementById('email').value.trim()
    const dateOfBirth = document.getElementById("dateofbirth").value
    
    if (!userName || !email || !dateOfBirth) {
        alert('Please fill all fields')
        return
    }
    
    try {
        const res = await fetch('/user', {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({userName, email, dateOfBirth})
        })
        
        const data = await res.json()
        
        if (res.ok) {
            console.log(data)
            alert('User info save successfully')
        } else {
            alert(data.error || 'User info not send')
        }
        
    } catch (err) {
        console.log(err)
        alert('Network error, try again')
    }
})