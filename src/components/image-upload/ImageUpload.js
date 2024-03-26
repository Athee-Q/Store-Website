"use Client";
import { UploadButton } from '../../utils/uploadthing';

const ImageUpload = ({setImageUrl}) => {

  const onClientUploadComplete = (res) => {
    console.log("Files: ", res);
    console.log(res[0].url);
    setImageUrl(res[0].url);
  };

  const onUploadError = (error) => {
    setImageUrl(`ERROR! ${error.message}`);
  }

  return (
    <div>
      <UploadButton
        className="mt-4 max-w-xs ut-button:bg-red-500 ut-button:ut-readying:bg-red-500/50"
        endpoint='imageUploader'
        
        onClientUploadComplete={onClientUploadComplete}
        onUploadError={onUploadError}
        onBeforeUploadBegin={(files) => {
          return files.map(
            (f) => new File([f], "renamed-" + f.name, { type: f.type }),
          );
        }}
        onUploadBegin={(name) => {
          console.log("Uploading: ", name);
        }}
      />
    </div>
  );
};

export default ImageUpload;
