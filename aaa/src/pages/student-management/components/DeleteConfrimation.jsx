import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DeleteConfirmation = ({ isOpen, student, onConfirm, onCancel, isDeleting }) => {
  if (!isOpen || !student) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="glass rounded-xl w-full max-w-md">
        {/* Header */}
        <div className="p-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-error/20 rounded-full flex items-center justify-center">
            <Icon name="AlertTriangle" size={32} className="text-error" />
          </div>
          
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Delete Student Record
          </h2>
          
          <p className="text-muted-foreground mb-4">
            Are you sure you want to delete this student record? This action cannot be undone.
          </p>

          {/* Student Info */}
          <div className="glass rounded-lg p-4 mb-6 text-left">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-primary">
                  {student?.name?.split(' ')?.map(n => n?.[0])?.join('')?.toUpperCase()}
                </span>
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">{student?.name}</div>
                <div className="text-xs text-muted-foreground">ID: {student?.studentId}</div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-muted-foreground">Class:</span>
                <span className="ml-1 text-foreground">{student?.class}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Status:</span>
                <span className={`ml-1 capitalize ${
                  student?.status === 'active' ? 'text-success' :
                  student?.status === 'inactive' ? 'text-error' : 'text-warning'
                }`}>
                  {student?.status}
                </span>
              </div>
            </div>
          </div>

          {/* Warning Message */}
          <div className="bg-error/10 border border-error/20 rounded-lg p-3 mb-6">
            <div className="flex items-start space-x-2">
              <Icon name="AlertCircle" size={16} className="text-error mt-0.5 flex-shrink-0" />
              <div className="text-left">
                <p className="text-sm font-medium text-error mb-1">
                  Warning: Permanent Action
                </p>
                <p className="text-xs text-muted-foreground">
                  Deleting this student will remove all associated attendance records, 
                  QR codes, and historical data. This action is irreversible.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            loading={isDeleting}
            iconName="Trash2"
            iconPosition="left"
          >
            {isDeleting ? 'Deleting...' : 'Delete Student'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;