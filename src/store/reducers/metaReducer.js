const initState = {
  author: {
    fieldLabel: "author",
    fieldName: "Автор:*",
    fieldValue: "Макаренко Антон Семёнович",
    isRequired: "required"
  },
  title: {
    fieldLabel: "title",
    fieldName: "Название:*",
    fieldValue: "Методика организации воспитательного процесса:",
    isRequired: "required"
  },
  origin: {
    fieldLabel: "origin",
    fieldName: "Источник:*",
    fieldValue:
      "А.С. Макаренко Педагогические сочинения в восьми томах. Т.1 стр.267-329",
    isRequired: "required"
  },
  source: {
    fieldLabel: "source",
    fieldName: "Ссылка на источник:",
    fieldValue: "https://www.marxists.org/"
  },
  publication: {
    fieldLabel: "publication",
    fieldName: "Место [издание] первого опубликования:",
    fieldValue: "в ведомственном издании небольшим тиражом"
  },
  keywords: {
    fieldLabel: "keywords",
    fieldName: "Ключевые слова (через запятую):",
    fieldValue: "педагогика, организация, коллектив"
  },
  translation: {
    fieldLabel: "translation",
    fieldName: "Перевод [optional]",
    fieldValue: ""
  },
  translationLink: {
    fieldLabel: "translationLink",
    fieldName: "Ссылка на перевод [optional]",
    fieldValue: ""
  },
  date: {
    fieldLabel: "date",
    fieldName: "datePublished",
    fieldValue: "1936"
  }
};

const metaReducer = (state = initState, action) => {
  switch (action.type) {
    case "UPDATE_META":
      console.log(state);

      const { fieldLabel, fieldName, fieldValue, isRequired } = action.payload;

      return {
        ...state,
        [fieldLabel]: {
          fieldLabel,
          fieldName,
          fieldValue,
          isRequired
        }
      };
    default:
      break;
  }
  return state;
};

export default metaReducer;
