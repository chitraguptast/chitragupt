import React, { useState, useRef, useCallback } from 'react';
import { UploadIcon, SendIcon, SaveIcon } from './icons';
import Dropdown, { DropdownOption } from './Dropdown';

const notificationOptions: DropdownOption[] = [
    { value: 'notice', label: 'Important Notice' },
    { value: 'homework', label: 'Homework Assignment' },
    { value: 'reminder', label: 'Event Reminder' },
    { value: 'announcement', label: 'General Announcement' },
];

const ShareNotifications: React.FC = () => {
    const [message, setMessage] = useState('');
    const [title, setTitle] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [notificationType, setNotificationType] = useState('notice');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const onButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setIsDragging(true);
        } else if (e.type === "dragleave") {
            setIsDragging(false);
        }
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    }, []);

    return (
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md max-w-3xl mx-auto">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Share Important Information</h2>
            
            <form className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notification Type</label>
                    <Dropdown 
                        options={notificationOptions}
                        value={notificationType}
                        onChange={setNotificationType}
                    />
                </div>

                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input 
                        type="text" 
                        name="title" 
                        id="title" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Enter notification title"
                    />
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea 
                        id="message" 
                        name="message" 
                        rows={6}
                        maxLength={500}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Enter your message here..."
                    ></textarea>
                    <p className="mt-2 text-sm text-gray-500 text-right">{message.length} / 500 characters</p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Attach File (Optional)</label>
                    <div 
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        onClick={onButtonClick}
                        className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'} border-dashed rounded-md cursor-pointer transition-colors duration-200`}
                    >
                        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                        <div className="space-y-1 text-center">
                            <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
                            {file ? (
                                <p className="text-sm text-gray-600 font-medium">{file.name}</p>
                            ) : (
                                <>
                                <p className="text-sm text-gray-600">
                                    <span className="font-medium text-blue-600 hover:text-blue-500">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-gray-500">PDF, DOC, or image files (Max 10MB)</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Send To</label>
                    <div className="space-y-2">
                        <div className="flex items-center">
                            <input id="students" name="students" type="checkbox" defaultChecked className="h-4 w-4 bg-white text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                            <label htmlFor="students" className="ml-2 block text-sm text-gray-900">All Students (Class 11-A)</label>
                        </div>
                        <div className="flex items-center">
                            <input id="parents" name="parents" type="checkbox" className="h-4 w-4 bg-white text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                            <label htmlFor="parents" className="ml-2 block text-sm text-gray-900">Parents/Guardians</label>
                        </div>
                    </div>
                </div>
            </form>

            <div className="mt-8 pt-5 border-t border-gray-200 flex flex-col sm:flex-row sm:justify-end gap-3">
                <button type="button" className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center space-x-2 justify-center">
                    <SaveIcon className="w-5 h-5 text-gray-500" />
                    <span>Save as Draft</span>
                </button>
                <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center space-x-2">
                    <SendIcon className="w-5 h-5"/>
                    <span>Send Notification</span>
                </button>
            </div>
        </div>
    );
};

export default ShareNotifications;