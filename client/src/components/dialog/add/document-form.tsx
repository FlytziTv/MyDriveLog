import { useTranslation } from "react-i18next";
import {
  InputGroup,
  InputGroupInput,
  InputGroupLabel,
  InputGroupTextarea,
  NativeSelect,
} from "../../ui/InputGroup";
import { UplaodCardForm } from "../../documents/UploadCard";

export function AddDocumentForm({
  onSuccess,
  onCancel,
}: {
  onSuccess: () => void;
  onCancel: () => void;
}) {
  const { t } = useTranslation(["dialog", "common"]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // ... logique API
    onSuccess(); // ferme le dialog
  };

  const SelectedDocumentType = [
    {
      value: "maintenance",
      label: t("add_document.select.category_option.maintenance"),
    },
    {
      value: "fuel",
      label: t("add_document.select.category_option.fuel"),
    },
    {
      value: "insurance",
      label: t("add_document.select.category_option.insurance"),
    },
    {
      value: "registration",
      label: t("add_document.select.category_option.registration"),
    },
    {
      value: "purchase",
      label: t("add_document.select.category_option.purchase"),
    },
    {
      value: "other",
      label: t("add_document.select.category_option.other"),
    },
  ];

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <UplaodCardForm />

      <InputGroup>
        <InputGroupLabel>{t("add_document.input.document")}</InputGroupLabel>
        <InputGroupInput
          type="text"
          placeholder={t("add_document.input.document_placeholder")}
        />
      </InputGroup>

      <InputGroup>
        <InputGroupLabel>{t("add_document.input.type")}</InputGroupLabel>
        <NativeSelect>
          <option>{t("add_document.input.type_placeholder")}</option>
          {SelectedDocumentType.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </NativeSelect>
      </InputGroup>

      <InputGroup>
        <InputGroupLabel>{t("add_document.input.vehicle")}</InputGroupLabel>
        <NativeSelect>
          <option>{t("add_document.input.vehicle_placeholder")}</option>
        </NativeSelect>
      </InputGroup>

      <InputGroup>
        <InputGroupLabel>{t("add_document.input.due_date")}</InputGroupLabel>
        <InputGroupInput
          type="date"
          placeholder={t("add_document.input.due_date_placeholder")}
        />
      </InputGroup>

      <InputGroup>
        <InputGroupLabel>{t("add_document.input.notes")}</InputGroupLabel>
        <InputGroupTextarea
          placeholder={t("add_document.input.notes_placeholder")}
        />
      </InputGroup>

      <div className="grid grid-cols-2 gap-4 ">
        <button
          type="button"
          onClick={onCancel}
          className="bg-transparent hover:bg-foreground/10 border text-foreground font-medium py-2 px-6 rounded-md transition-colors duration-200 cursor-pointer"
        >
          {t("common:dialog_actions.cancel")}
        </button>
        <button
          type="submit"
          className="bg-foreground hover:bg-foreground/70 text-background font-medium py-2 px-6 rounded-md transition-colors disabled:cursor-not-allowed disabled:bg-foreground/50 disabled:opacity-50 duration-200 cursor-pointer"
        >
          {t("dialog:add_document.submit")}
        </button>
      </div>
    </form>
  );
}
