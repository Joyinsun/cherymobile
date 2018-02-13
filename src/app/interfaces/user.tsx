"use strict";

interface User {
    /**
     * 用户id
     */
    id: number;

    created_at: number;

    status: string;
    /**
     * 上一次访问所用设备系统device id
     */
    last_device: string;
    /**
     * 用户角色
     */
    role: string[];
    /**
     * 用户名
     */
    login: string;

    /**
     * 用户性别
     */
    gender: string;
}

export default User;
