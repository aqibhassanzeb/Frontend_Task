import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiUrl } from '../config';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authReducer?.activeUser?.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  reducerPath: 'task-api',
  tagTypes: ['User', 'Messages','MessagesHandle'],
  endpoints: build => ({
    Register: build.mutation({
      query: data => {
        return {
          url: '/user_signup',
          method: 'POST',
          body: data,
        };
      },
    }),
    Login: build.mutation({
      query: data => {
        return {
          url: '/user_login',
          method: 'POST',
          body: data,
        };
      },
      providesTags: ['User'],
    }),
    googleLogin: build.mutation({
      query: data => {
        return {
          url: '/user_googlelogin',
          method: 'POST',
          body: data,
        };
      },
      providesTags: ['User'],
    }),

    getStudents: build.query({
      query: (page) => ({
        url: '/user',
        method: 'GET',
        params: {
          page,
        },
      }),
      providesTags: ['User'],
    }),
    assignTask: build.mutation({
      query: data => {
        return {
          url: '/task_create',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['User'],
    }),

    getAllTask: build.query({
      query: (params) => ({
        url: '/task_show',
        method: 'GET',
        params
      }),
      providesTags: ['User'],
    }),
    getTaskbyId: build.query({
      query: (id) => ({
        url: '/task_show',
        method: 'GET',
        params: {
          _id: id,
        },
      }),
      providesTags: ['User'],
    }),
    accessChat: build.mutation({
      query: data => {
        return {
          url: '/chat_access',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['User'],
    }),
    fetchMessages: build.mutation({
      query: (params) => ({
        url: `/all_messages/${params?.chatId}`,
        method: 'PUT',
        params: {
          _id: params?._id,
        },
      }),
      invalidatesTags: ['Messages'],
    }),
    getChats: build.query({
      query: (user) => {
        return {
          url: `/fetch_chats?user=${user}`,
          method: 'GET',
        };
      },
      providesTags: ['Messages'],
    }),
    messageSend: build.mutation({
      query: data => {
        return {
          url: '/send_message',
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: ['Messages'],
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useGetStudentsQuery,
  useAccessChatMutation, useFetchMessagesMutation, useGetChatsQuery,
  useMessageSendMutation, useAssignTaskMutation, useGetAllTaskQuery, useGetTaskbyIdQuery, useGoogleLoginMutation,
} = api;
