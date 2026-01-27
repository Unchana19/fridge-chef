import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@heroui/react";
import { Camera, RefreshCw } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

interface CameraCaptureProps {
	isOpen: boolean;
	onClose: () => void;
	onCapture: (imageSrc: string) => void;
}

const videoConstraints = {
	width: 1280,
	height: 720,
	facingMode: "user",
};

export const CameraCapture = ({
	isOpen,
	onClose,
	onCapture,
}: CameraCaptureProps) => {
	const webcamRef = useRef<Webcam>(null);
	const [facingMode, setFacingMode] = useState<"user" | "environment">("user");

	const capture = useCallback(() => {
		const imageSrc = webcamRef.current?.getScreenshot();
		if (imageSrc) {
			onCapture(imageSrc);
			onClose();
		}
	}, [onCapture, onClose]);

	const toggleCamera = () => {
		setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			size="2xl"
			classNames={{
				base: "bg-content1 border border-default-200",
				header: "border-b border-default-200",
				footer: "border-t border-default-200",
				closeButton: "hover:bg-default-100 active:bg-default-200",
			}}
		>
			<ModalContent>
				<ModalHeader className="flex flex-col gap-1">Take a Photo</ModalHeader>
				<ModalBody className="py-6">
					<div className="relative rounded-2xl overflow-hidden bg-black aspect-video flex items-center justify-center">
						<Webcam
							audio={false}
							ref={webcamRef}
							screenshotFormat="image/jpeg"
							videoConstraints={{
								...videoConstraints,
								facingMode,
							}}
							className="w-full h-full object-cover"
						/>
					</div>
				</ModalBody>
				<ModalFooter className="justify-between">
					<Button
						isIconOnly
						variant="flat"
						onPress={toggleCamera}
						aria-label="Switch Camera"
					>
						<RefreshCw size={20} />
					</Button>

					<div className="flex gap-2">
						<Button color="danger" variant="light" onPress={onClose}>
							Cancel
						</Button>
						<Button
							color="primary"
							onPress={capture}
							startContent={<Camera size={20} />}
							className="font-semibold"
						>
							Capture
						</Button>
					</div>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
