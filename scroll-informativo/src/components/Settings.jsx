export default function Settings({ categorias, categoriasAtivas, setCategoriasAtivas }) {
  
  const alternarCategoria = (categoria) => {
    if (categoriasAtivas.includes(categoria)) {
      setCategoriasAtivas(categoriasAtivas.filter(c => c !== categoria));
    } else {
      setCategoriasAtivas([...categoriasAtivas, categoria]);
    }
  };

  return (
    <div className="definicoes-container">
      <h2 style={{ fontSize: '28px', marginBottom: '8px' }}>Temas do InfoScroll</h2>
      <p style={{ marginBottom: '32px', color: 'var(--text-secondary)' }}>
        Escolhe os temas que queres ver no teu Feed principal.
      </p>

      <div className="filtros">
        <button 
          className={`btn-filtro ${categoriasAtivas.length === 0 ? 'ativo' : ''}`}
          onClick={() => setCategoriasAtivas([])}
        >
          Mistura Total
        </button>
        
        {categorias.map(categoria => (
          <button 
            key={categoria}
            className={`btn-filtro ${categoriasAtivas.includes(categoria) ? 'ativo' : ''}`}
            onClick={() => alternarCategoria(categoria)}
          >
            {categoria}
          </button>
        ))}
      </div>
    </div>
  );
}