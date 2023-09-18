import React, { useState, useEffect } from "react";
import { Form, Input, Button, Typography, Col, Row } from "antd";
import { UserInfoProps } from "../../interfaces"; 
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { updateUser } from "../store/userActions";
import merge from 'deepmerge'; 
import styles from "./UserInfo.module.css";


const UserInfo: React.FC<UserInfoProps> = ({ userInfo }) => {

  const dispatch = useDispatch();
    
  const [form] = Form.useForm();
  const onReset = () => {
    setChangesMade(false);
    form.resetFields();
  };

  const [initialUserInfo, setInitialUserInfo] = useState(userInfo);
  const [changesMade, setChangesMade] = useState(false);

  useEffect(() => {
    setInitialUserInfo(userInfo);
  }, [userInfo]);

  const onChange = (changedValues: any) => {
    setChangesMade(true);
    const updatedUser = merge(userInfo, changedValues);
    setInitialUserInfo(updatedUser);
  };

  const onSubmit = (values: any) => {
    dispatch(updateUser({ id: userInfo.id, user: initialUserInfo }))
    setChangesMade(false);
  };

  return (
    <Form
      form={form}
      onValuesChange={onChange}
      onFinish={onSubmit}
      layout="vertical"
    >
      <Row>
        <Col span={5} className={styles['form-column']}>
          <Typography.Title level={5}>Information</Typography.Title>

          <Form.Item
            label="Name"
            name="name"
            initialValue={`${userInfo.name}`}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Username"
            name="username"
            initialValue={`${userInfo.username}`}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: "email" }]}
            initialValue={`${userInfo.email}`}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phone"
            initialValue={`${userInfo.phone}`}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Website"
            name="website"
            initialValue={`${userInfo.website}`}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col span={5} className={styles['form-column']}>
          <Typography.Title level={5}>Address</Typography.Title>

          <Form.Item
            label="City"
            name={["address","city"]}
            rules={[{ required: true }]}
            initialValue={`${userInfo.address.city}`}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Street"
            name={["address","street"]}
            rules={[{ required: true }]}
            initialValue={`${userInfo.address.street}`}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Suite"
            name={["address", "suite"]}
            rules={[{ required: true }]}
            initialValue={`${userInfo.address.suite}`}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="ZIP Code"
            name={["address","zipcode"]}
            initialValue={`${userInfo.address.zipcode}`}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Latitude"
            name={["address", "geo", "lat"]}
            initialValue={`${userInfo.address.geo.lat}`}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Longitude"
            name={["address", "geo", "lng"]}
            initialValue={`${userInfo.address.geo.lng}`}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col span={5} className={styles['form-column']}>
          <Typography.Title level={5}>Company</Typography.Title>

          <Form.Item
            label="Name"
            name={["company", "name"]}
            initialValue={`${userInfo.company.name}`}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Catch Phrase"
            name={["company", "catchPhrase"]}
            initialValue={`${userInfo.company.catchPhrase}`}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Business Services"
            name={["company", "bs"]}
            initialValue={`${userInfo.company.bs}`}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item className={styles['form-buttons-wrapper']}>
        <Button type="primary" htmlType="submit" disabled={!changesMade} className={styles['form-button']}>
          Submit Change
        </Button>
        <Button htmlType="button" onClick={onReset} disabled={!changesMade} className={styles['form-button']}>
          Reset
        </Button>

        <Link to={`/users/${userInfo.username}/posts`} state={`${userInfo.id}`} className={styles['form-button']}>
          <Button type="default">
            See Posts
          </Button>
        </Link>
      </Form.Item>
    </Form>
  );
};

export default UserInfo;
