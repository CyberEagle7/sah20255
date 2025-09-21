import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StudentTable = ({ students, onEdit, onDelete, loading }) => {
  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          {[...Array(5)]?.map((_, i) => (
            <div key={i} className="h-16 bg-muted/20 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!students || students?.length === 0) {
    return (
      <div className="p-6 text-center">
        <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
        <p className="text-muted-foreground">No students match your current filters</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden md:block">
        <table className="w-full">
          <thead className="bg-muted/10">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Student
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Roll Number
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Year
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {students?.map((student, index) => (
              <tr 
                key={student?.id || index}
                className="hover:bg-muted/10 lightning-transition-fast"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">
                        {student?.name?.charAt(0)?.toUpperCase() || '?'}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{student?.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Added {new Date(student?.created_at)?.toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="font-mono text-foreground">{student?.roll_no}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 py-1 bg-primary/10 text-primary text-sm rounded-lg">
                    {student?.department}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-foreground">{student?.year}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onEdit?.(student)}
                      iconName="Edit"
                      className="neon-hover"
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onDelete?.(student)}
                      iconName="Trash"
                      className="text-destructive hover:text-destructive neon-hover"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="md:hidden p-4 space-y-4">
        {students?.map((student, index) => (
          <div 
            key={student?.id || index}
            className="p-4 border border-border rounded-lg hover:border-primary/50 lightning-transition-fast"
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                <span className="text-white font-medium">
                  {student?.name?.charAt(0)?.toUpperCase() || '?'}
                </span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">{student?.name}</p>
                <p className="text-sm text-muted-foreground">Roll: {student?.roll_no}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
              <div>
                <span className="text-muted-foreground">Department:</span>
                <p className="text-foreground">{student?.department}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Year:</span>
                <p className="text-foreground">{student?.year}</p>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">
                Added {new Date(student?.created_at)?.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onEdit?.(student)}
                  iconName="Edit"
                  className="neon-hover"
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onDelete?.(student)}
                  iconName="Trash"
                  className="text-destructive hover:text-destructive neon-hover"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentTable;