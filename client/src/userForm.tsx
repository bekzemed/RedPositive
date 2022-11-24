import { Button, Form, Input, notification } from "antd";
import { useDispatch } from "react-redux";
import { addUserRequest } from "./redux/store/actions";

/*
 *
 *
 *
 */
const UserForm = ({ onSuccess }: any) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  /*
	*
	Form config
	*
	*/
  const VALIDATION = {
    name: [{ required: true }],
    phone: [{ required: true }],
    hobbies: [{ required: true }],
  };

  /*
	*
	handle request sent to register a new user 
	*
	*/
  const onCreateUser = async (values: any) => {
    try {
      dispatch(
        addUserRequest({ ...values, hobbies: values.hobbies.split(",") })
      );
      form.resetFields();
      onSuccess();
      notification.success({ message: "User successfully registerd." });
    } catch (err: any) {
      notification.error({ message: err.message });
    }
  };

  return (
    <Form
      form={form}
      initialValues={{ remember: true }}
      onFinish={onCreateUser}
      autoComplete="off"
      encType="multipart/form-data"
      labelCol={{ span: 6 }}
    >
      <Form.Item label="Name" name="name" rules={VALIDATION.name}>
        <Input placeholder="Bereket" />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="bereketzemed@gmail.com" />
      </Form.Item>

      <Form.Item label="Phone" name="phone" rules={VALIDATION.phone}>
        <Input placeholder="+251962239267" />
      </Form.Item>

      <Form.Item label="Hobbies" name="hobbies" rules={VALIDATION.hobbies}>
        <Input placeholder="Coding, Football" />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 6 }}>
        <Button type="primary" htmlType="submit">
          Register new user
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserForm;
