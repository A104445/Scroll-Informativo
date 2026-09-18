import json
import time
import os
import google.generativeai as genai

# 1. Coloca aqui a tua chave do Google AI Studio
genai.configure(api_key="AQ.Ab8RN6Imd6NxIt358LMrEWIKwh7KQL-pfGMnFS4mtElWfGln2g")

# 2. Força a resposta a ser rigorosamente um JSON estruturado
model = genai.GenerativeModel('gemini-3.1-flash-lite', generation_config={"response_mime_type": "application/json"})

def traduzir_item_gemini(item, tipo):
    prompt = f"""
    Translate the text content of this {tipo} from Portuguese to English. 
    Return ONLY a valid JSON object with the exact same keys and structure.
    Do not translate the 'id', 'categoria', 'facto_id', or 'resposta_correta' keys.
    JSON to translate:
    {json.dumps(item, ensure_ascii=False)}
    """
    try:
        resposta = model.generate_content(prompt)
        return json.loads(resposta.text)
    except Exception as e:
        print(f"Erro na API: {e}")
        return None

def traduzir_ficheiro(ficheiro_entrada, ficheiro_saida, tipo):
    with open(ficheiro_entrada, 'r', encoding='utf-8') as f:
        dados = json.load(f)
        
    if os.path.exists(ficheiro_saida):
        with open(ficheiro_saida, 'r', encoding='utf-8') as f:
            traduzidos = json.load(f)
    else:
        traduzidos = []
        
    inicio = len(traduzidos)
    if inicio >= len(dados):
        print(f"[{ficheiro_entrada}] Já está 100% traduzido!\n")
        return

    print(f"A traduzir [{ficheiro_entrada}] com o Gemini a partir do item {inicio + 1}...")
    
    while inicio < len(dados):
        item_traduzido = traduzir_item_gemini(dados[inicio], tipo)
        
        if item_traduzido:
            traduzidos.append(item_traduzido)
            # Guarda o progresso imediatamente após cada tradução bem-sucedida
            with open(ficheiro_saida, 'w', encoding='utf-8') as f:
                json.dump(traduzidos, f, ensure_ascii=False, indent=2)
            
            print(f"Sucesso: {inicio + 1}/{len(dados)}")
            inicio += 1
            time.sleep(4.1) # Respeita o limite gratuito de 15 pedidos/minuto
        else:
            print("A pausar 15 segundos antes de tentar novamente...")
            time.sleep(15)

if __name__ == "__main__":
    print("A iniciar o motor de tradução...")
    traduzir_ficheiro('factos.json', 'factos_en.json', 'trivia fact')
    traduzir_ficheiro('perguntas.json', 'perguntas_en.json', 'quiz question with options')