document.addEventListener('DOMContentLoaded', () => {
    const customersDiv = document.getElementById('customers');
    const customerDiv = document.getElementById('customer');
    const transferDiv = document.getElementById('transfer');
  
    fetch('/api/customers')
      .then(response => response.json())
      .then(customers => {
        customersDiv.innerHTML = customers.map(customer => `
          <div>
            <p>${customer.name} - ${customer.current_balance}</p>
            <button onclick="viewCustomer(${customer.id})">View</button>
          </div>
        `).join('');
      });
  
    window.viewCustomer = (id) => {
      fetch(`/api/customers/${id}`)
        .then(response => response.json())
        .then(customer => {
          customerDiv.innerHTML = `
            <h2>${customer.name}</h2>
            <p>Email: ${customer.email}</p>
            <p>Balance: ${customer.current_balance}</p>
            <h3>Transfer Money</h3>
            <input type="number" id="amount" placeholder="Amount">
            <button onclick="transferMoney(${customer.id})">Transfer</button>
          `;
        });
    };
  
    window.transferMoney = (senderId) => {
      const amount = document.getElementById('amount').value;
      const receiverId = prompt('Enter receiver ID:');
      fetch('/api/transfer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senderId, receiverId, amount })
      })
        .then(response => response.json())
        .then(result => {
          alert(result.message);
          location.reload();
        });
    };
  });
  