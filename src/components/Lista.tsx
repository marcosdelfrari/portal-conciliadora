export function Lista({ titulo, itens }: { titulo: string; itens: { nome: string; cnpj: string }[] }) {
  return (
    <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-xl">
      <div className="border-b border-gray-200 dark:border-[#2a2a2a] flex">
        <h2 className="text-gray-900 dark:text-white px-4 py-2">{titulo}</h2>
      </div>
      <div className="p-4">
        <ul>
          {itens.map((item, index) => (
            <li key={index} className="text-gray-700 dark:text-neutral-300 text-sm tracking-wide">
              {item.nome} <br />
              <p className="text-gray-700 dark:text-neutral-500">{item.cnpj}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
