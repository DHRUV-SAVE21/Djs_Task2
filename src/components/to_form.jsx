import React, { useState } from 'react';

/**
 * Simple Todo form with a "Generate Random Task" helper.
 * Usage:
 *   <ToForm onAddTodo={(todo) => setTodos(t => [todo, ...t])} />
 */
export default function ToForm({ onAddTodo }) {
    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');
    const [priority, setPriority] = useState('normal');
    const [due, setDue] = useState('');

    const suggestions = [
        'Buy groceries',
        'Read 20 pages of a book',
        'Refactor navigation component',
        'Write unit tests for utils',
        'Clean up unused CSS',
        'Optimize image loading',
        'Fix broken link on homepage',
        'Plan next week sprint',
        'Document API endpoints',
        'Create onboarding checklist'
    ];

    const generateRandom = () => {
        const s = suggestions[Math.floor(Math.random() * suggestions.length)];
        setTitle(s);
        setDetails('Auto-generated suggestion. Edit details as needed.');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const t = title.trim();
        if (!t) return;
        const todo = {
            id: Date.now(),
            title: t,
            details: details.trim() || null,
            priority,
            due: due || null,
            completed: false
        };
        if (typeof onAddTodo === 'function') onAddTodo(todo);
        else console.log('New todo:', todo);
        setTitle('');
        setDetails('');
        setPriority('normal');
        setDue('');
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 8, maxWidth: 600 }}>
            <div style={{ display: 'flex', gap: 8 }}>
                <input
                    aria-label="Todo title"
                    placeholder="What needs to be done?"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    style={{ flex: 1, padding: 8 }}
                />
                <select value={priority} onChange={e => setPriority(e.target.value)} aria-label="Priority">
                    <option value="low">Low</option>
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                </select>
                <input type="date" value={due} onChange={e => setDue(e.target.value)} />
            </div>

            <textarea
                placeholder="Details (optional)"
                value={details}
                onChange={e => setDetails(e.target.value)}
                rows={3}
                style={{ padding: 8 }}
            />

            <div style={{ display: 'flex', gap: 8 }}>
                <button type="submit">Add Todo</button>
                <button type="button" onClick={generateRandom}>Generate Random Task</button>
                <button
                    type="button"
                    onClick={() => {
                        setTitle('');
                        setDetails('');
                        setPriority('normal');
                        setDue('');
                    }}
                >
                    Clear
                </button>
            </div>
        </form>
    );
}