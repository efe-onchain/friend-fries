import Modal from "react-responsive-modal";

// https://stackoverflow.com/a/21742107
function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent;

  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
    return "Windows Phone";
  }

  if (/android/i.test(userAgent)) {
    return "Android";
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent)) {
    return "iOS";
  }

  return "unknown";
}
export function CustomModal({ open, onClose, onClick, friend = true }: any) {
  const isIOS = getMobileOperatingSystem() === "iOS";
  const isDesktop = getMobileOperatingSystem() === "unknown";
  return (
    <Modal open={open} onClose={onClose} center>
      <h2 className="mt-4">
        {isDesktop
          ? "Friendfries only works on mobile currently. Please open this page on mobile."
          : friend
          ? "Scan the bracelet of the person that completed the bounty."
          : "Scan your own bracelet."}
      </h2>
      {isIOS ? (
        <p>
          Since you are on iOS, you need to click on the second option on the
          next modal. Also, according to Kartik it might not work some of the
          time, but what can you do... iOS
        </p>
      ) : null}
      {!isDesktop ? (
        <button className="float-right mt-8" onClick={onClick}>
          Scan now
        </button>
      ) : null}
    </Modal>
  );
}
