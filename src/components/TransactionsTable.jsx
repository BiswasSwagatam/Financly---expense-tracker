import { Radio, Select, Table } from 'antd'
import { parse, unparse } from 'papaparse'
import React, { useState } from 'react'
import { toast } from 'react-toastify'



function TransactionsTable({transactions, addTransaction, getTransactions}) {

    const {Option} = Select
    const [search, setSearch] = useState("")
    const [typeFilter, setTypeFilter] = useState("")
    const [sortKey, setSortKey] = useState("")

        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Amount',
                dataIndex: 'amount',
                key: 'amount',
            },
            {
                title: 'Tag',
                dataIndex: 'tag',
                key: 'tag',
            },
            {
                title: 'Date',
                dataIndex: 'date',
                key: 'date',
            },
            {
                title: 'Type',
                dataIndex: 'type',
                key: 'type',
            },
            ];

        // let filteredTransactions = transactions.filter(
        //     (item) => 
        //         item.name.toLowerCase().includes(search.toLowerCase()) && 
        //         item.type.includes(typeFilter))

        const filteredTransactions = transactions.filter((transaction) => {
            const searchMatch = search
              ? transaction.name.toLowerCase().includes(search.toLowerCase())
              : true;
            // const tagMatch = selectedTag ? transaction.tag === selectedTag : true;
            const typeMatch = typeFilter ? transaction.type === typeFilter : true;
        
            return searchMatch  && typeMatch;
          });

        const sortedTransactions = [...filteredTransactions].sort((a, b) => {
            if (sortKey === "date") {
                return new Date(a.date) - new Date(b.date);
            } else if (sortKey === "amount") {
                return a.amount - b.amount;
            } else {
                return 0;
            }
        })

    function exportCSV() {
        var csv = unparse({
            fields: ['name', 'amount', 'tag', 'type', 'date'],
            data: transactions,
        });
        var blob = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
        var url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'transactions.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    function importCSV(event) {
        event.preventDefault();
    try {
      parse(event.target.files[0], {
        header: true,
        complete: async function (results) {
          // Now results.data is an array of objects representing your CSV rows
          for (const transaction of results.data) {
            // Write each transaction to Firebase, you can use the addTransaction function here
            console.log("Transactions", transaction);
            const newTransaction = {
              ...transaction,
              amount: parseFloat(transaction.amount),
            };
            await addTransaction(newTransaction, true);
          }
        },
      });
      toast.success("All Transactions Added");
      getTransactions();
      event.target.files = null;
    } catch (e) {
      toast.error(e.message);
    }
    }

    return   ( 
        <>
        <div className='flex justify-between gap-2 mt-10'>
            <input 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
                placeholder=' Search transactions by name...'
                className='flex-1 pl-1 p-[1px] ml-5 focus:rounded-lg shadow-md border-[1px] rounded-lg '
            />
            
            <Select 
                onChange={(value) => setTypeFilter(value)}
                value={typeFilter}
                placeholder='Filter by type'
                allowClear
                className='w-1/5 mr-5 shadow-md border-[1px] rounded-lg '
            >
                <Option value="">All</Option>
                <Option value="income">Income</Option>
                <Option value="expense">Expense</Option>
            </Select>
        </div>
        <div className='flex justify-between m-5 items-center'>
            <h1 className='text-3xl font-bold'>My transactions</h1>
            <Radio.Group
                onChange={(e) => setSortKey(e.target.value)}
                value={sortKey} 
                className=' mr-5 shadow-md border-[1px] rounded-lg '
            >
                <Radio.Button value="">No Sort</Radio.Button>
                <Radio.Button value="date">Sort by Date</Radio.Button>
                <Radio.Button value="amount">Sort by Amount</Radio.Button>
            </Radio.Group>
            <div className='flex gap-4'>
                <button onClick={exportCSV} className='text-sm border-2 border-indigo-600 rounded-md bg-indigo-600  text-white hover:bg-white hover:text-indigo-600 p-[4px]'>Export CSV</button>
                <label for='file-csv' className='text-sm border-2 border-indigo-600 rounded-lg bg-white  text-indigo-600 hover:bg-indigo-600 hover:text-white p-[4px]'>
                    Import CSV
                </label>
                <input 
                    id='file-csv'
                    type="file"
                    accept='.csv'
                    required
                    className='hidden'
                    onChange={importCSV}
                />
            </div>
        </div>
            
            <Table dataSource={sortedTransactions} columns={columns} className='m-5 shadow-lg' />  
        </> 
    )
    
  
}

export default TransactionsTable