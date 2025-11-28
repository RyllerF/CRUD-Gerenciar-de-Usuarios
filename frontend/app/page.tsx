'use client';

import { useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  age: number;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/usuarios`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
      showMessage('Erro ao carregar usuários', 'error');
    }
  };

  const showMessage = (text: string, type: 'success' | 'error') => {
    setMessage(text);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingId) {
        
          await fetch(`${API_URL}/usuarios/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, age: parseInt(age) }),
        });
        showMessage('Usuário atualizado com sucesso!', 'success');
      } else {
        
          await fetch(`${API_URL}/usuarios`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, age: parseInt(age) }),
        });
        showMessage('Usuário criado com sucesso!', 'success');
      }

      setName('');
      setEmail('');
      setAge('');
      setEditingId(null);
      fetchUsers();
    } catch (error) {
      console.error('Erro:', error);
      showMessage('Erro ao salvar usuário', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user: User) => {
    setName(user.name);
    setEmail(user.email);
    setAge(user.age.toString());
    setEditingId(user.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar este usuário?')) return;

    try {
      await fetch(`${API_URL}/usuarios/${id}`, {
        method: 'DELETE',
      });
      showMessage('Usuário deletado com sucesso!', 'success');
      fetchUsers();
    } catch (error) {
      console.error('Erro ao deletar:', error);
      showMessage('Erro ao deletar usuário', 'error');
    }
  };

  const handleCancel = () => {
    setName('');
    setEmail('');
    setAge('');
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Gerenciador de Usuários
          </h1>

        </div>

        
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg text-white text-center font-medium ${
              message.includes('Erro') ? 'bg-red-500' : 'bg-green-500'
            }`}
          >
            {message}
          </div>
        )}

        
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {editingId ? 'Editar Usuário' : 'Adicionar Novo Usuário'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Nome
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition text-gray-900"
                placeholder="Digite o nome completo"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition text-gray-900"
                placeholder="exemplo@email.com"
              />
            </div>

            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
                Idade
              </label>
              <input
                type="number"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
                min="0"
                max="150"
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition text-gray-900"
                placeholder="Digite a idade"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Salvando...' : editingId ? 'Atualizar' : 'Adicionar'}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition"
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>


        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
             Lista de Usuários ({users.length})
          </h2>

          {users.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Nenhum usuário cadastrado ainda.</p>
              <p className="text-gray-400 text-sm mt-2">Adicione um usuário usando o formulário acima!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
                      <p className="text-gray-600 mt-1"> {user.email}</p>
                      <p className="text-gray-600 mt-1"> {user.age} anos</p>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(user)}
                        className="px-5 py-2 bg-yellow-500 text-white rounded-lg font-medium hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="px-5 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition"
                      >
                        Deletar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
