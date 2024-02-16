// src/routes/api/taskStatus/[taskId].ts
import type { RequestHandler } from '@sveltejs/kit';
import { tasks } from '$lib/server/taskStore';

export const GET: RequestHandler = async ({ params }) => {
    const { taskId } = params;
    const task = tasks.get(taskId);

    if (!task) {
        return new Response(JSON.stringify({ error: 'Task not found' }), {
            status: 404,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    // Return the current status of the task
    return new Response(JSON.stringify({ status: task.status }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
};
