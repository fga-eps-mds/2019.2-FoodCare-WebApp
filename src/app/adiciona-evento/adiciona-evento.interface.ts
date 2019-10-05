export interface Alimento {
    id: number;
    id_evento: number;
    id_categoria: number;
    nome: string;
    un_medida: string;
    quantidade: number;
  }
  export interface Categoria {
      id: number;
      nome: string;
  }

  export interface Evento {
      id: number;
      local : string;
      data_inicio: Date;
      data_final: Date;
      //#id_doador:
      //id_endereco:
    }
