
import React from 'react'
import { Row, Card } from 'antd'

function Cards({showExpenseModal, showIncomeModal, income, expense, balance}) {
  return (
    <div>
        <Row className='flex justify-around m-5 gap-5'>
          <Card className='font-outfit min-w-[200px] max-w-[400px] flex-1 shadow-lg ' title="Current balance">
            <p>₹ {balance}</p>
            <button className='font-outfit border-2 border-indigo-600 rounded-lg bg-indigo-600  text-white hover:bg-white hover:text-indigo-600 mt-5 p-2 w-full'>
              Reset Balance
            </button>
          </Card>
          <Card className='font-outfit min-w-[200px] max-w-[400px] flex-1 shadow-lg' title="Total Income">
            <p>₹ {income}</p>
            <button onClick={showIncomeModal} className='font-outfit border-2 border-indigo-600 rounded-lg bg-indigo-600  text-white hover:bg-white hover:text-indigo-600 mt-5 p-2 w-full'>
              Add Income
            </button>
          </Card>
          <Card className='font-outfit min-w-[200px] max-w-[400px] flex-1 shadow-lg' title="Total Expenses">
            <p>₹ {expense}</p>
            <button onClick={showExpenseModal} className='font-outfit border-2 border-indigo-600 rounded-lg bg-indigo-600  text-white hover:bg-white hover:text-indigo-600 mt-5 p-2 w-full'>
              Add Expense
            </button>
          </Card>
        </Row>
    </div>
  )
}

export default Cards

