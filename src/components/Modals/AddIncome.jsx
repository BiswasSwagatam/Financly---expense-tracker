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

function AddIncomeModal({
  isIncomeModalVisible,
  handleIncomeCancel,
  onFinish,
}) {
  const [form] = Form.useForm();
  return (
    <Modal
      style={{ fontWeight: 600, fontFamily: "Outfit" }}
      title="Add Income"
      open={isIncomeModalVisible}
      onCancel={handleIncomeCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
          onFinish(values, "income");
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
            { required: true, message: "Please input the income amount!" },
          ]}
        >
          <Input type="number" className="font-outfit" />
        </Form.Item>
        <Form.Item
          style={{ fontWeight: 600, fontFamily: "Outfit" }}
          label="Date"
          name="date"
          rules={[
            { required: true, message: "Please select the income date!" },
          ]}
        >
          <DatePicker className="font-outfit" format="DD/MM/YYYY"/>
        </Form.Item>
        <Form.Item
          style={{ fontWeight: 600, fontFamily: "Outfit" }}
          label="Tag"
          name="tag"
          rules={[{ required: true, message: "Please select a tag!" }]}
        >
          <Select className="font-outfit">
            <Select.Option className="font-outfit" value="salary">Salary</Select.Option>
            <Select.Option className="font-outfit" value="freelance">Freelance</Select.Option>
            <Select.Option className="font-outfit" value="investment">Investment</Select.Option>
            {/* Add more tags here */}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button className="font-outfit" type="primary"  htmlType="submit">
            Add Income
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddIncomeModal;