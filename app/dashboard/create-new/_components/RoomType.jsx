import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function RoomType({ selectedRoomType }) {
  return (
    <div>
      <label className="text-slate-400 font-semibold">Room Type*</label>
      <Select onValueChange={(value) => selectedRoomType(value)}>
        <SelectTrigger className="w-full mt-3">
          <SelectValue placeholder="Select a Room Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Room Types</SelectLabel>
            <SelectItem value="livingroom">Living Room</SelectItem>
            <SelectItem value="bedroom">Bedroom</SelectItem>
            <SelectItem value="kitchen">Kitchen</SelectItem>
            <SelectItem value="bathroom">Bathroom</SelectItem>
            <SelectItem value="office">Office Room</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default RoomType;
