import React from "react";
import {
  Card,
  Col,
  Row,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
} from "antd";
function AddExpenseModal({
  isExpenseModalVisible,
  handleExpenseCancel,
  onFinish,
}) {
  const [form] = Form.useForm();
  return (
    <Modal
      style={{ fontWeight: 600, fontFamily: "Outfit" }}
      title="Add Expense"
      open={isExpenseModalVisible}
      onCancel={handleExpenseCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
          onFinish(values, "expense");
          form.resetFields();
        }}
      >
        <Form.Item
          style={{ fontWeight: 600, fontFamily: "Outfit" }}
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input the name of the transaction!",
            },
          ]}
        >
          <Input type="text" className="font-outfit" />
        </Form.Item>
        <Form.Item
          style={{ fontWeight: 600, fontFamily: "Outfit" }}
          label="Amount"
          name="amount"
          rules={[
            { required: true, message: "Please input the expense amount!" },
          ]}
        >
          <Input type="number" className="font-outfit" />
        </Form.Item>
        <Form.Item
          style={{ fontWeight: 600, fontFamily: "Outfit" }}
          label="Date"
          name="date"
          rules={[
            { required: true, message: "Please select the expense date!" },
          ]}
        >
          <DatePicker className="font-outfit" format="DD/MM/YYYY" />
        </Form.Item>
        <Form.Item
          label="Tag"
          name="tag"
          style={{ fontWeight: 600, fontFamily: "Outfit" }}
          rules={[{ required: true, message: "Please select a tag!" }]}
        >
          <Select className="font-outfit">
            <Select.Option className="font-outfit" value="food">Food</Select.Option>
            <Select.Option className="font-outfit" value="education">Education</Select.Option>
            <Select.Option className="font-outfit" value="office">Office</Select.Option>
            {/* Add more tags here */}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button className="font-outfit" type="primary" htmlType="submit">
            Add Expense
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddExpenseModal;