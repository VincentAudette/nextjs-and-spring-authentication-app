import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useAuth } from 'context/auth-context';

const roles = [
  { id: 'ROLE_ADMINISTRATEUR', title: 'Administrateur' },
  { id: 'ROLE_PREPOSE_AUX_CLIENTS_RESIDENTIELS', title: 'Préposé aux clients résidentiels' },
  { id: 'ROLE_PREPOSE_AUX_CLIENTS_DAFFAIRE', title: 'Préposé aux clients d\'affaire' },
];

export default function FormulaireCreationUtilisateur({setOpen}){
  const { profile } = useAuth();
  const queryClient = useQueryClient();
  const [user, setUser] = useState<{username:string,password:string,role:string}|null>(null);

  const addUser = async (user) => {
    const res = await fetch(`/api/addNewUser?token=${profile.token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    if (!res.ok) {
      const errorObj = await res.json();
      errorObj.status = res.status;
      throw errorObj;
    }
    return await res.json();
  }

  const mutation = useMutation(addUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('users'); // if you have a 'users' query in your application
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await mutation.mutateAsync(user);
      console.log(res);
      if(res.id){
        setOpen(false);
      }
    } catch(e) {
      console.log(e);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="font-semibold text-lg p-5 rounded-md flex flex-col gap-5 text-neutral-900">
      <div>
        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
          Nom d&apos;utilisateur
        </label>
        <div className="mt-2">
          <input
            id="username"
            name="username"
            type="text"
            required
            value={user?.username}
            onChange={(e) => setUser({...user, username: e.target.value})}
            className="block w-full rounded-md py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus-light sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      
      <div>
        <label className="tblock text-sm font-medium leading-6 text-gray-900">Role</label>
        <fieldset className="mt-2">
          <legend className="sr-only">Role</legend>
          <div className="gap-2 flex flex-col items-start space-y-0">
            {roles.map((role) => (
              <div key={role.id} className="flex items-center">
                <input
                  id={role?.id}
                  name="role"
                  type="radio"
                  checked={user?.role === role.id}
                  onChange={() => setUser({...user, role: role.id})}
                  className="h-4 w-4 border-gray-300 text-red-600 focus:ring-red-600"
                />
                <label htmlFor={role.id} className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                  {role.title}
                </label>
              </div>
            ))}
          </div>
        </fieldset>
      </div>
      <button type="submit" className="btn-primary mt-4">
        Ajouter utilisateur
      </button>
    </form>
  );
}
