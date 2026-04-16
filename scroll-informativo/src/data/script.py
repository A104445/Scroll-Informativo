import json

# Nomes dos ficheiros
FICHEIRO_ORIGEM = 'cartoes.json'
FICHEIRO_DESTINO = 'factos.json'

def atualizar_ids_factos():
    print(f"A ler o ficheiro {FICHEIRO_ORIGEM}...")
    
    try:
        with open(FICHEIRO_ORIGEM, 'r', encoding='utf-8') as f:
            factos = json.load(f)
    except FileNotFoundError:
        print(f"ERRO: Não encontrei o ficheiro '{FICHEIRO_ORIGEM}'. Garante que estão na mesma pasta.")
        return

    # Atualizar os IDs de todos os factos
    for facto in factos:
        id_antigo = facto['id']
        # Uma pequena proteção: só adiciona o 'f' se ele ainda não estiver lá
        if not str(id_antigo).startswith('f'):
            facto['id'] = f"f{id_antigo}"

    # Guardar no novo ficheiro (preservando os acentos em português)
    with open(FICHEIRO_DESTINO, 'w', encoding='utf-8') as f:
        json.dump(factos, f, ensure_ascii=False, indent=2)
        
    print(f"✅ Sucesso! {len(factos)} factos atualizados e guardados em '{FICHEIRO_DESTINO}'.")

if __name__ == "__main__":
    atualizar_ids_factos()