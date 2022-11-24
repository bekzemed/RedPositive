import { Button, Form, Input, notification } from "antd";
import { useDispatch } from "react-redux";
import { updateUserRequest } from "./redux/store/actions";

/*
 *
 *
 *
 */
const UserUpdateForm = ({ onSuccess, data }: any) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  /*
	*
	handle request sent to update user 
	*
	*/
  const onUpdateUser = async (values: any) => {
    try {
      dispatch(
        updateUserRequest({
          ...values,
          _id: data._id,
          hobbies: values.hobbies.split(","),
        })
      );
      form.resetFields();
      onSuccess();
      notification.success({ message: "User successfully updated." });
    } catch (err: any) {
      notification.error({ message: err.message });
    }
  };

  return (
    <Form
      form={form}
      initialValues={{ remember: true }}
      onFinish={onUpdateUser}
      autoComplete="off"
      encType="multipart/form-data"
      labelCol={{ span: 6 }}
    >
      <Form.Item label="Name" name="name" initialValue={data.name}>
        <Input placeholder="Bereket" />
      </Form.Item>

      <Form.Item label="Email" name="email" initialValue={data.email}>
        <Input placeholder="bereketzemed@gmail.com" />
      </Form.Item>

      <Form.Item label="Phone" name="phone" initialValue={data.phone}>
        <Input placeholder="+251962239267" />
      </Form.Item>

      <Form.Item
        label="Hobbies"
        name="hobbies"
        initialValue={data.hobbies.toString()}
      >
        <Input placeholder="Coding, Football" />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 6 }}>
        <Button type="primary" htmlType="submit">
          Update User
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserUpdateForm;
